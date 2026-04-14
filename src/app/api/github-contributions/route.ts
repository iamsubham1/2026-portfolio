import { NextResponse } from "next/server";
import { site } from "@/lib/content";

export const revalidate = 3600;

type ApiContribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export async function GET(request: Request) {
  const currentYear = new Date().getFullYear();
  const { searchParams } = new URL(request.url);
  const yearParam = Number(searchParams.get("year"));
  const selectedYear =
    Number.isInteger(yearParam) && yearParam >= 2008 && yearParam <= currentYear
      ? yearParam
      : currentYear;
  const username =
    process.env.GITHUB_USERNAME ??
    process.env.NEXT_PUBLIC_GITHUB_USERNAME ??
    site.githubUsername;

  if (!username) {
    return NextResponse.json(
      { error: "GitHub username is not configured." },
      { status: 400 },
    );
  }

  const primaryUrl = `https://github-contributions-api.jogruber.de/v4/${username}?format=nested&y=${selectedYear}`;

  try {
    const response = await fetch(primaryUrl, {
      next: { revalidate: 3600 },
      headers: { accept: "application/json" },
    });
    let contributions: ApiContribution[] = [];
    let total = 0;

    if (!response.ok) {
      return NextResponse.json(
        {
          username,
          year: selectedYear,
          total: 0,
          contributions: buildEmptyContributions(selectedYear),
          degraded: true,
        },
        {
          headers: {
            "Cache-Control": "s-maxage=300, stale-while-revalidate=300",
          },
        },
      );
    }

    const data = (await response.json()) as {
      total?: Record<string, number>;
      contributions?:
        | Array<{
            date: string;
            count: number;
            level: 0 | 1 | 2 | 3 | 4;
          }>
        | Record<
            string,
            Record<
              string,
              Record<
                string,
                {
                  date: string;
                  count: number;
                  level: 0 | 1 | 2 | 3 | 4;
                }
              >
            >
          >;
    };

    const flattenedContributions = normalizeContributions(data.contributions);
    contributions = buildCurrentYearContributions(selectedYear, flattenedContributions);

    total =
      data.total?.[String(selectedYear)] ??
      contributions.reduce((sum, item) => sum + item.count, 0);

    return NextResponse.json(
      { username, year: selectedYear, total, contributions },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=3600",
        },
      },
    );
  } catch {
    return NextResponse.json(
      {
        username,
        year: selectedYear,
        total: 0,
        contributions: buildEmptyContributions(selectedYear),
        degraded: true,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=300, stale-while-revalidate=300",
        },
      },
    );
  }
}

function buildEmptyContributions(year: number): ApiContribution[] {
  return buildCurrentYearContributions(year, []);
}

function normalizeContributions(
  contributions:
    | Array<ApiContribution>
    | Record<
        string,
        Record<string, Record<string, ApiContribution>>
      >
    | undefined,
): ApiContribution[] {
  if (!contributions) return [];
  if (Array.isArray(contributions)) return contributions;

  return Object.values(contributions)
    .flatMap((months) => Object.values(months))
    .flatMap((days) => Object.values(days))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function buildCurrentYearContributions(
  year: number,
  source: ApiContribution[],
): ApiContribution[] {
  const byDate = new Map(source.map((item) => [item.date, item]));
  const startMs = Date.UTC(year, 0, 1);
  const endMs = Date.UTC(year, 11, 31);
  const dayMs = 24 * 60 * 60 * 1000;
  const result: ApiContribution[] = [];

  for (let ms = startMs; ms <= endMs; ms += dayMs) {
    const iso = formatDateUTC(new Date(ms));
    const found = byDate.get(iso);
    result.push(
      found ?? {
        date: iso,
        count: 0,
        level: 0,
      },
    );
  }

  return result;
}

function formatDateUTC(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
