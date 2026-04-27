import type { Problem } from "@/types";

export const problems: Problem[] = [
  {
    id: "sum_two_numbers",
    title: "Sum Two Numbers",
    difficulty: "easy",
    summary: "Read two integers from standard input and print their sum.",
    inputFormat: [
      "One line with two space-separated integers `a` and `b`.",
    ],
    outputFormat: [
      "Print a single integer: `a + b`.",
    ],
    approach: [
      "Read all input as a string.",
      "Split by whitespace and parse into integers.",
      "Add the first two numbers and print the result.",
    ],
    samples: [
      { input: "3 5", output: "8" },
      { input: "10 -4", output: "6" },
    ],
    starterCode: `use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();

    let nums: Vec<i64> = input
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();

    // TODO: compute the answer.
    let answer = 0i64;

    println!("{answer}");
}
`,
  },
  {
    id: "max_of_three",
    title: "Maximum of Three",
    difficulty: "easy",
    summary: "Read three integers and print the largest one.",
    inputFormat: [
      "One line with three space-separated integers.",
    ],
    outputFormat: [
      "Print the maximum value among the three integers.",
    ],
    approach: [
      "Parse the three integers from input.",
      "Compare them with `max` or a small `if` chain.",
      "Print the largest value.",
    ],
    samples: [
      { input: "7 2 9", output: "9" },
      { input: "-1 -5 -3", output: "-1" },
    ],
    starterCode: `use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();

    let nums: Vec<i64> = input
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();

    // TODO: compute the maximum of the first three numbers.
    let answer = 0i64;

    println!("{answer}");
}
`,
  },
  {
    id: "count_even_numbers",
    title: "Count Even Numbers",
    difficulty: "medium",
    summary: "Read `n`, then read `n` integers, and print how many of them are even.",
    inputFormat: [
      "The first number is `n`.",
      "The next `n` numbers are the sequence to inspect.",
    ],
    outputFormat: [
      "Print one integer: the count of even numbers.",
    ],
    approach: [
      "Parse all numbers from input.",
      "Take the first number as `n`.",
      "Loop over the next `n` values and count numbers divisible by `2`.",
    ],
    samples: [
      { input: "5\n1 2 3 4 5", output: "2" },
      { input: "6\n2 4 6 8 10 11", output: "5" },
    ],
    starterCode: `use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();

    let nums: Vec<i64> = input
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();

    let n = nums[0] as usize;

    // TODO: inspect nums[1..=n] and count the even values.
    let answer = 0usize;

    println!("{answer}");
}
`,
  },
];
