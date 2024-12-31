export const mockChats = [
  {
    id: "1",
    title: "General Chat",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    messages: [
      {
        role: "assistant",
        content: "Hello! How can I help you today?",
      },
      {
        role: "user",
        content: "I'd like to learn about AI.",
      },
      {
        role: "assistant",
        content: "That's great! Artificial Intelligence is a fascinating field. What specific aspects would you like to learn about?",
      },
    ],
  },
  {
    id: "2",
    title: "Technical Support",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    messages: [
      {
        role: "assistant",
        content: "Welcome to technical support. What issue are you experiencing?",
      },
      {
        role: "user",
        content: "I'm having trouble with my code.",
      },
      {
        role: "assistant",
        content: "Could you please share the specific error message or describe the problem you're encountering?",
      },
    ],
  },
  {
    id: "3",
    title: "Project Discussion",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    messages: [
      {
        role: "assistant",
        content: "Let's discuss your project requirements.",
      },
      {
        role: "user",
        content: "I need help planning my software architecture.",
      },
      {
        role: "assistant",
        content: "I'd be happy to help. What type of application are you building?",
      },
    ],
  },
];