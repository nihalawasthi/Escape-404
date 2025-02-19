export interface Coding_Task {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  imageUrl?: string; // Optional property for image URL
}

export const questions: Coding_Task[] = [
  {
    id: 1,
    question: `(C++) What is the output of the following code snippet?`,
    imageUrl: "/images/coding_task_img/Q1.jpg", // Ensure the path is correct
    options: ["3.5", "3", "3.0", "Undefined"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: `(C++) Which of the following correctly allocates a dynamic array for 5 integers and initializes them to 0?`,
    imageUrl: "/images/coding_task_img/Q2.jpg", // Ensure the path is correct
    options: ["Option A", "Option B", "Option C", "Options A and D"],
    correctAnswer: 3
  },
  {
    id: 3,
    question: `(Python) Complete the code to safely convert a string input to an integer, printing an error message if conversion fails:`,
    imageUrl: "/images/coding_task_img/Q3.jpg", // Ensure the path is correct
    options: ["Exception", "ValueError", "(ValueError, TypeError)", "Both a and b"],
    correctAnswer: 3
  },
  {
    id: 4,
    question: `(Java) Which line correctly declares and initializes an array of 4 integers with values 1, 2, 3, and 4?`,
    imageUrl: "/images/coding_task_img/Q4.jpg", // Ensure the path is correct
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 3
  },
  {
    id: 5,
    question: `(C++) What is the output of the following nested loop?`,
    imageUrl: "/images/coding_task_img/Q5.jpg", // Ensure the path is correct
    options: ["0123", "0112", "0113", "0122"],
    correctAnswer: 1
  },
  {
    id: 6,
    question: `(Python) Identify and fix the syntax error in the following snippet:`,
    imageUrl: "/images/coding_task_img/Q6.jpg", // Ensure the path is correct
    options: ["Add a colon after `range(3)`", "Remove the colon", "Change `range(3)` to `xrange(3)`", "Indent the print statement further"],
    correctAnswer: 0
  },
  {
    id: 7,
    question: `(Java) What will be printed by the following code?`,
    imageUrl: "/images/coding_task_img/Q7.jpg", // Ensure the path is correct
    options: ["2", "3", "1", "0"],
    correctAnswer: 0
  },
  {
    id: 8,
    question: `(C++) Identify the error in this code snippet:`,
    imageUrl: "/images/coding_task_img/Q8.jpg", // Ensure the path is correct
    options: ["Missing semicolon after `int x = 10`", "Missing return type for main()", "Incorrect cout syntax", "No error"],
    correctAnswer: 0
  },
  {
    id: 9,
    question: `(Python) Complete the function to return the cube of a number:`,
    imageUrl: "/images/coding_task_img/Q9.jpg", // Ensure the path is correct
    options: ["x * 3", "x ** 3", "pow(x, 3)", "Both b and c"],
    correctAnswer: 3
  },
  {
    id: 10,
    question: `(Java) What does the following code print?`,
    imageUrl: "/images/coding_task_img/Q10.jpg", // Ensure the path is correct
    options: ["1", "2", "0", "3"],
    correctAnswer: 0
  },
  {
    id: 11,
    question: `(C++) Which option correctly overloads the '+' operator for a class named \`Complex\`?`,
    imageUrl: "/images/coding_task_img/Q11.jpg", // Ensure the path is correct
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 3
  },
  {
    id: 12,
    question: `(Python) What is the output of this code?`,
    imageUrl: "/images/coding_task_img/Q12.jpg", // Ensure the path is correct
    options: ["5", "4", "6", "7"],
    correctAnswer: 1
  },
  {
    id: 13,
    question: `(Java) Identify the error in this code snippet and select the fix:`,
    imageUrl: "/images/coding_task_img/Q13.jpg", // Ensure the path is correct
    options: ["Add a semicolon after the println statement", "Change class name", "Modify the main method signature", "No error"],
    correctAnswer: 0
  },
  {
    id: 14,
    question: `(C++) What is the output of the following code?`,
    imageUrl: "/images/coding_task_img/Q14.jpg", // Ensure the path is correct
    options: ["10", "11", "12", "Undefined"],
    correctAnswer: 1
  },
  {
    id: 15,
    question: `(Python) Complete the code to catch exceptions when converting a string to an integer:`,
    imageUrl: "/images/coding_task_img/Q15.jpg", // Ensure the path is correct
    options: ["Exception", "ValueError", "TypeError", "Both a and b"],
    correctAnswer: 3
  },
  {
    id: 16,
    question: `(Java) Identify the mistake that makes the variable immutable in the following code:`,
    imageUrl: "/images/coding_task_img/Q16.jpg", // Ensure the path is correct
    options: ["Remove final", "Declare x as final", "Comment out or remove the assignment after initialization", "Change int to Integer"],
    correctAnswer: 2
  },
  {
    id: 17,
    question: `(C++) Which of these correctly declares a constant integer?`,
    imageUrl: "/images/coding_task_img/Q17.jpg", // Ensure the path is correct
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 3
  },
  {
    id: 18,
    question: `(Python) What is printed by the following code?`,
    imageUrl: "/images/coding_task_img/Q18.jpg", // Ensure the path is correct
    options: ["7", "12", "4", "Error"],
    correctAnswer: 1
  },
  {
    id: 19,
    question: `(Java) Complete the code to instantiate an object of class \`Car\`:`,
    imageUrl: "/images/coding_task_img/Q19.jpg", // Ensure the path is correct
    options: ["Car();", "new Car();", "Car.new();", "create Car();"],
    correctAnswer: 1
  },
  {
    id: 20,
    question: `(C++) What is the output of this code involving post-increment?`,
    imageUrl: "/images/coding_task_img/Q20.jpg", // Ensure the path is correct
    options: ["4", "5", "6", "Undefined"],
    correctAnswer: 1
  },
  {
    id: 21,
    question: `(Python) Identify and fix the error in the following loop:`,
    imageUrl: "/images/coding_task_img/Q21.jpg", // Ensure the path is correct
    options: ["Add a colon after `range(5)`", "Change `range(5)` to `xrange(5)`", "Remove the print statement", "Indent the print statement"],
    correctAnswer: 0
  },
  {
    id: 22,
    question: `(Java) What does the following code print using the ternary operator?`,
    imageUrl: "/images/coding_task_img/Q22.jpg", // Ensure the path is correct
    options: ["8", "10", "Error", "18"],
    correctAnswer: 1
  },
  {
    id: 23,
    question: `(C++) In the following code, what is the type of \`ptr\`?`,
    imageUrl: "/images/coding_task_img/Q23.jpg", // Ensure the path is correct
    options: ["Integer", "Pointer to integer", "Reference to integer", "Integer array"],
    correctAnswer: 1
  },
  {
    id: 24,
    question: `(Python) Complete the code to open a file named "input.txt" for reading:`,
    imageUrl: "/images/coding_task_img/Q24.jpg", // Ensure the path is correct
    options: ["\"w\"", "\"r\"", "\"a\"", "\"x\""],
    correctAnswer: 1
  },
  {
    id: 25,
    question: `(Java) Complete the catch block to handle multiple exceptions (Java 7+):`,
    imageUrl: "/images/coding_task_img/Q25.jpg", // Ensure the path is correct
    options: ["IOException | SQLException", "IOException || SQLException", "IOException, SQLException", "Exception"],
    correctAnswer: 0
  },
  {
    id: 26,
    question: `(C++) Which is the correct destructor declaration for class \`MyClass\`?`,
    imageUrl: "/images/coding_task_img/Q26.jpg", // Ensure the path is correct
    options: ["~MyClass();", "MyClass::~MyClass();", "destructor MyClass();", "void ~MyClass();"],
    correctAnswer: 0
  },
  {
    id: 27,
    question: `(Python) What happens when this code is executed?`,
    imageUrl: "/images/coding_task_img/Q27.jpg", // Ensure the path is correct
    options: ["Prints 3", "Prints None", "Raises IndexError", "Raises KeyError"],
    correctAnswer: 2
  },
  {
    id: 28,
    question: `(C++) Complete the following code t decinter arithmetic code:`,
    imageUrl: "/images/coding_task_img/Q28.jpg", // Ensure the path is correct
    options: ["The code is correct", "Change *(ptr + 1) to ptr[1]", "Remove the dereference operator", "Use &arr instead of arr"],
    correctAnswer: 0
  },
  {
    id: 29,
    question: `(Python) Complete the code to define a function with a default parameter:`,
    imageUrl: "/images/coding_task_img/Q29.jpg", // Ensure the path is correct
    options: ["Correct as is", "Remove the default parameter", "Use a lambda instead", "Add a colon after function definition"],
    correctAnswer: 0
  },
  {
    id: 30,
    question: `(Java) What is the output of the following code involving string concatenation in a loop?`,
    imageUrl: "/images/coding_task_img/Q30.jpg", // Ensure the path is correct
    options: ["012", "123", "3", "Error"],
    correctAnswer: 0
  }
];
