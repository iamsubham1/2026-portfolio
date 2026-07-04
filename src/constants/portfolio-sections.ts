export const projects = [
  {
    title: "Kafka Microservices",
    description:
      "Distributed event-driven backend showcasing asynchronous communication with Apache Kafka.",
    tags: [
      "Node.js",
      "Apache Kafka",
      "Microservices",
      "Docker Compose",
      "Express"
    ],
    href: "https://github.com/iamsubham1/Node-Kafka-microservice-K8s",
    working:
      "Engineered a distributed backend composed of independent User, Order, and Payment services using Node.js and Apache Kafka. Leveraged producer-consumer patterns and event-driven messaging to coordinate user creation, order lifecycle, and payment processing without direct service-to-service communication, with Docker Compose used for containerized local deployment."
  },
  {
    title: "Gadgets Grab",
    description:
      "Modern e-commerce with secure payments, OAuth authentication, and Redis caching for optimized performance.",
    tags: ["E-commerce", "Payments", "Redis"],
    href: "https://gadgetsgrabapp.netlify.app/",
    working:
      "Built a full-stack e-commerce platform with React, Redux Toolkit, and Node.js. Implemented PhonePe online payments, Cash on Delivery, OAuth authentication, location detection for delivery, shopping cart, order management, and Redis caching to improve performance."
  },
  {
    title: "Connect",
    description:
      "Real-time chat powered by Socket.IO—fast, reliable messaging with a seamless UX.",
    tags: ["Socket.IO", "Real-time", "Node"],
    href: "https://connectchattingapp.netlify.app/login",
    working:
      "Developed a real-time messaging application using Socket.IO and WebSockets with instant message delivery, online presence, typing indicators, authentication, and persistent chat history for a seamless communication experience."
  },
  {
    title: "YTMusic",
    description:
      "Electron desktop app that elevates YouTube Music with a sleek, native-like streaming interface.",
    tags: ["Electron", "Desktop", "Streaming"],
    href: "https://drive.google.com/file/d/1DJeHSoDpui3Hi6M9PhzrnVMI5lSgtffo/view?usp=sharing",
    working:
      "Created a cross-platform Electron desktop application that wraps YouTube Music into a native desktop experience with media controls, keyboard shortcuts, background playback, and a clean, distraction-free interface."
  },
  {
    title: "WhatsApp Web Translator",
    description:
      "Chrome extension for real-time translation in WhatsApp Web—multilingual conversations without friction.",
    tags: ["Chrome Extension", "i18n"],
    href: "https://github.com/iamsubham1/whatsapp-lang-translate-extension",
    working:
      "Built a Chrome extension that translates WhatsApp Web conversations in real time, enabling seamless multilingual messaging by detecting new messages and translating content directly within the chat interface."
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
