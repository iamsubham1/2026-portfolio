export const projects = [
  {
    title: "Gadgets Grab",
    description:
      "Modern e-commerce with secure payments, OAuth authentication, and Redis caching for optimized performance.",
    tags: ["E-commerce", "Payments", "Redis"],
    href: "#contact",
  },
  {
    title: "Connect",
    description:
      "Real-time chat powered by Socket.IO—fast, reliable messaging with a seamless UX.",
    tags: ["Socket.IO", "Real-time", "Node"],
    href: "#contact",
  },
  {
    title: "YTMusic",
    description:
      "Electron desktop app that elevates YouTube Music with a sleek, native-like streaming interface.",
    tags: ["Electron", "Desktop", "Streaming"],
    href: "#contact",
  },
  {
    title: "WhatsApp Web Translator",
    description:
      "Chrome extension for real-time translation in WhatsApp Web—multilingual conversations without friction.",
    tags: ["Chrome Extension", "i18n"],
    href: "#contact",
  },
] as const;

export const experience = [
  {
    role: "Backend Developer",
    company: "IdeaUser Technologies",
    description:
      "Built the full backend from scratch single-handedly, leveraging Redis, Kafka, and other technologies to create scalable and efficient microservices.",
  },
  {
    role: "Backend Developer Intern",
    company: "Chirpn IT Solutions",
    description:
      "Built scalable microservices, optimized database queries, improved system performance, and integrated third-party APIs. Collaborated with front-end teams for seamless user experiences.",
  },
  {
    role: "Full-Stack Developer",
    company: "RIG Technologies",
    description:
      "Developed web apps using React, Node.js, and MongoDB. Maintained code quality, implemented CI/CD pipelines, and collaborated across teams for robust feature delivery.",
  },
  {
    role: "Frontend Developer Intern",
    company: "ReWork.Ai",
    description:
      "Created responsive UIs with React, optimized component performance, and collaborated with designers to integrate APIs and deliver intuitive user interfaces.",
  },
] as const;

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      { name: "HTML 5", note: "Semantic markup and web standards." },
      { name: "CSS 3", note: "Responsive and modern layouts." },
      { name: "JavaScript", note: "Core scripting and logic." },
      { name: "React JS", note: "Component-driven UIs and SPA architecture." },
      { name: "Redux", note: "State management for React apps." },
      { name: "Tailwind CSS", note: "Utility-first CSS framework." },
      { name: "TypeScript", note: "Typed JavaScript for safer code." },
      { name: "Next JS", note: "React framework for server-side rendering and static site generation." },
      { name: "Vercel", note: "Serverless platform for static site hosting and deployment." },
      { name: "Framer Motion", note: "Animation library for React." },
      { name: "Gsap", note: "Animation library for React." },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node JS", note: "Backend services and API development." },
      { name: "Express", note: "Node.js framework for building web applications." },
      { name: "NestJS", note: "Progressive Node.js framework." },
      { name: "Socket.IO", note: "Real-time bi-directional communication." },
      { name: "Apache Kafka", note: "Message queue for asynchronous communication." },
      { name: "Python", note: "Python programming language." },
      { name: "FastAPI", note: "Python framework for building web applications." },
      { name: "Firebase", note: "Backend as a Service for building web and mobile applications." },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "MongoDB", note: "NoSQL document database solutions." },
      { name: "PostgreSQL", note: "Relational database management." },
      { name: "Redis", note: "In-memory data structures and caching." },
      { name: "Elasticsearch", note: "Search engine for storing and querying vectors." },
    ],
  },
  {
    title: "AI",
    items: [
      { name: "OpenAI", note: "LLM" },
      { name: "Claude", note: "LLM" },
      { name: "Langchain", note: "Langchain is a framework for building AI applications." },
      { name: "langGraph", note: "LangGraph is a framework for building AI applications." },
      { name: "PydanticAI", note: "Python agent framework to build applications and workflows with Generative AI." },

    ],
  },
  {
    title: "Cloud",
    items: [{ name: "Amazon Web Services", note: "Cloud infrastructure." },
    { name: "Google Cloud Platform", note: "Cloud infrastructure." },
    ],
  },
  {
    title: "Misc",
    items: [
      { name: "Git", note: "Version control and collaboration." },
      { name: "Docker", note: "Containerization and deployment." },
    ],
  },

] as const;
