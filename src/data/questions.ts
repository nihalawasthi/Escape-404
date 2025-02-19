export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "What is the time complexity of binary search in the worst case?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which data structure uses LIFO (Last In, First Out) principle?",
    options: ["Queue", "Stack", "Linked List", "Hash Table"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Which programming language is widely used for data science and AI development?",
    options: ["Java", "Python", "C++", "PHP"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Which of the following is a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "Which of the following is NOT an operating system?",
    options: ["Linux", "Windows", "MS Excel", "macOS"],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "Which company owns GitHub?",
    options: ["Google", "Microsoft", "Amazon", "Apple"],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Standard Query Language", "Simple Query Language", "Sequential Query Language"],
    correctAnswer: 0
  },
  {
    id: 8,
    question: "Which of these is NOT a front-end framework?",
    options: ["React", "Angular", "Django", "Vue"],
    correctAnswer: 2
  },
  {
    id: 9,
    question: "Which encryption algorithm is used in HTTPS?",
    options: ["AES", "RSA", "MD5", "SHA-256"],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "Which social media platform was acquired by Elon Musk in 2022?",
    options: ["Instagram", "Facebook", "Twitter", "LinkedIn"],
    correctAnswer: 2
  },
  {
    id: 11,
    question: "Which company developed the first graphical web browser?",
    options: ["Microsoft", "Netscape", "CERN", "Mosaic"],
    correctAnswer: 3
  },
  {
    id: 12,
    question: "What is the main function of a firewall?",
    options: ["Speed up the internet", "Block unauthorized access", "Store cookies", "Boost network bandwidth"],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "Which of these is a deep learning framework?",
    options: ["NumPy", "PyTorch", "Pandas", "SciPy"],
    correctAnswer: 1
  },
  {
    id: 14,
    question: "What does SaaS stand for in cloud computing?",
    options: ["System as a Service", "Software as a Service", "Security as a Service", "Storage as a Service"],
    correctAnswer: 1
  },
  {
    id: 15,
    question: "Which sorting algorithm has the best worst-case time complexity?",
    options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Selection Sort"],
    correctAnswer: 2
  },
  {
    id: 16,
    question: "Which language is primarily used for Android app development?",
    options: ["Swift", "Kotlin", "C#", "Ruby"],
    correctAnswer: 1
  },
  {
    id: 17,
    question: "What does API stand for?",
    options: ["Application Programming Interface", "Automated Process Integration", "Advanced Protocol Implementation", "Applied Programming Interface"],
    correctAnswer: 0
  },
  {
    id: 18,
    question: "Which company developed the TensorFlow library?",
    options: ["Apple", "Facebook", "Google", "Amazon"],
    correctAnswer: 2
  },
  {
    id: 19,
    question: "What does CSS stand for in web development?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Styling System", "Centralized Styling Structure"],
    correctAnswer: 1
  },
  {
    id: 20,
    question: "Which of these is a JavaScript runtime environment?",
    options: ["Node.js", "Django", "Spring", "Laravel"],
    correctAnswer: 0
  },
  {
    id: 21,
    question: "Which technology is used to secure blockchain transactions?",
    options: ["Cryptography", "Cloud Computing", "Data Mining", "Machine Learning"],
    correctAnswer: 0
  },
  {
    id: 22,
    question: "Which database language is used to manage relational databases?",
    options: ["HTML", "JavaScript", "SQL", "Python"],
    correctAnswer: 2
  },
  {
    id: 23,
    question: "What is the primary purpose of an IP address?",
    options: ["Identify devices on a network", "Store user data", "Encrypt data packets", "Measure bandwidth usage"],
    correctAnswer: 0
  },
  {
    id: 24,
    question: "Which HTTP status code represents 'Not Found'?",
    options: ["200", "301", "404", "500"],
    correctAnswer: 2
  },
  {
    id: 25,
    question: "Which language is commonly used for writing smart contracts on Ethereum?",
    options: ["Python", "Java", "Solidity", "C++"],
    correctAnswer: 2
  },
  {
    id: 26,
    question: "Which company developed the iPhone?",
    options: ["Samsung", "Google", "Apple", "Microsoft"],
    correctAnswer: 2
  },
  {
    id: 27,
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "HighText Machine Language", "HyperText and links Markup Language", "Home Tool Markup Language"],
    correctAnswer: 0
  },
  {
    id: 28,
    question: "Which sorting algorithm is generally considered fastest in practice for random datasets?",
    options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Insertion Sort"],
    correctAnswer: 1
  },
  {
    id: 29,
    question: "Which protocol is used for secure web browsing?",
    options: ["HTTP", "FTP", "SMTP", "HTTPS"],
    correctAnswer: 3
  },
  {
    id: 30,
    question: "Which programming paradigm emphasizes functions without state and side effects?",
    options: ["Object-Oriented Programming", "Procedural Programming", "Functional Programming", "Logic Programming"],
    correctAnswer: 2
  },
  {
    id: 31,
    question: "What does OOP stand for?",
    options: ["Open Operating Protocol", "Object Oriented Programming", "Overloaded Object Procedures", "Optimized Oriented Programming"],
    correctAnswer: 1
  },
  {
    id: 32,
    question: "Which tool is widely used for version control?",
    options: ["SVN", "Git", "Mercurial", "CVS"],
    correctAnswer: 1
  },
  {
    id: 33,
    question: "What is the typical file extension for a JavaScript file?",
    options: [".js", ".java", ".jsx", ".ts"],
    correctAnswer: 0
  },
  {
    id: 34,
    question: "Which language is primarily used for iOS app development?",
    options: ["Swift", "Kotlin", "Java", "Objective-C"],
    correctAnswer: 0
  },
  {
    id: 35,
    question: "Which programming language is primarily used for statistical analysis?",
    options: ["Python", "R", "Java", "C++"],
    correctAnswer: 1
  },
  {
    id: 36,
    question: "Which design pattern restricts object creation to a single instance?",
    options: ["Factory", "Observer", "Singleton", "Decorator"],
    correctAnswer: 2
  },
  {
    id: 37,
    question: "Which type of memory is non-volatile?",
    options: ["RAM", "Cache", "ROM", "Virtual Memory"],
    correctAnswer: 2
  },
  {
    id: 38,
    question: "Which cloud service model provides infrastructure as a service?",
    options: ["SaaS", "PaaS", "IaaS", "DaaS"],
    correctAnswer: 2
  },
  {
    id: 39,
    question: "What does MVC stand for in software architecture?",
    options: ["Model View Controller", "Module Value Component", "Model Version Control", "Machine Virtual Core"],
    correctAnswer: 0
  },
  {
    id: 40,
    question: "Which algorithm is used to find the shortest path in a weighted graph?",
    options: ["Bubble Sort", "Dijkstra's Algorithm", "Binary Search", "Merge Sort"],
    correctAnswer: 1
  },
  {
    id: 41,
    question: "Which software development methodology is iterative and incremental?",
    options: ["Waterfall", "Agile", "V-Model", "Spiral"],
    correctAnswer: 1
  },
  {
    id: 42,
    question: "What is the main purpose of a compiler?",
    options: ["Interpret code at runtime", "Convert source code to machine code", "Manage memory", "Debug applications"],
    correctAnswer: 1
  },
  {
    id: 43,
    question: "Which HTML element is used to display an image on a webpage?",
    options: ["<image>", "<img>", "<pic>", "<src>"],
    correctAnswer: 1
  },
  {
    id: 44,
    question: "Which command is used to install packages in Node.js?",
    options: ["npm install", "node install", "npx install", "yarn add"],
    correctAnswer: 0
  },
  {
    id: 45,
    question: "Which technology is used for real-time, bidirectional communication in web applications?",
    options: ["WebSockets", "HTTP/2", "REST", "GraphQL"],
    correctAnswer: 0
  },
  {
    id: 46,
    question: "What is the primary purpose of a DNS server?",
    options: ["Store website files", "Translate domain names to IP addresses", "Secure network traffic", "Monitor web performance"],
    correctAnswer: 1
  },
  {
    id: 47,
    question: "Which file format is commonly used for data interchange in web applications?",
    options: ["XML", "CSV", "JSON", "YAML"],
    correctAnswer: 2
  },
  {
    id: 48,
    question: "Which is the latest version of HTML?",
    options: ["HTML4", "XHTML", "HTML5", "HTML 2.0"],
    correctAnswer: 2
  },
  {
    id: 49,
    question: "Which framework is used for building cross-platform mobile apps using JavaScript?",
    options: ["Ionic", "React Native", "Flutter", "Xamarin"],
    correctAnswer: 1
  },
  {
    id: 50,
    question: "Which of the following is an example of a functional programming language?",
    options: ["Java", "C#", "Haskell", "Python"],
    correctAnswer: 2
  }
];
