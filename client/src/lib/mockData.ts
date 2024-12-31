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
      {
        role: "user",
        content: "Can you tell me about ESG practices at Astra International?",
      },
      {
        role: "assistant",
        content: "Astra International has implemented various ESG (Environmental, Social, and Governance) practices. In terms of environmental initiatives, they focus on reducing carbon emissions, implementing energy-efficient technologies, and promoting sustainable waste management across their operations. Their social initiatives include community development programs, employee welfare schemes, and educational support for local communities. For governance, they maintain high standards of corporate transparency, ethical business practices, and stakeholder engagement.",
      },
      {
        role: "user",
        content: "What about their sustainability goals?",
      },
      {
        role: "assistant",
        content: "Astra International has set ambitious sustainability goals as part of their long-term strategy. They aim to achieve carbon neutrality in their operations by implementing renewable energy solutions, improving energy efficiency, and offsetting remaining emissions. They've also committed to responsible water management, zero waste to landfill targets, and biodiversity conservation in areas where they operate. These initiatives are regularly monitored and reported in their annual sustainability report.",
      },
      {
        role: "user",
        content: "How do they handle employee development?",
      },
      {
        role: "assistant",
        content: "Astra International places strong emphasis on employee development through various programs:\n\n1. Training and Education: Regular skill development programs and workshops\n2. Career Growth: Clear career progression paths and leadership development initiatives\n3. Work-Life Balance: Flexible working arrangements and wellness programs\n4. Equal Opportunities: Commitment to diversity and inclusion in the workplace\n5. Performance Management: Regular feedback and performance reviews\n\nThey also provide educational assistance and professional certification support for employees looking to enhance their qualifications.",
      }
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
        content: "I'm having trouble accessing ESG data.",
      },
      {
        role: "assistant",
        content: "I'll help you access the ESG data. Could you please specify which company's data you're trying to view?",
      }
    ],
  }
] as const;