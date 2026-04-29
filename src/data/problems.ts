import type { Problem } from "@/types";

export const problems: Problem[] = [
  {
    id: "sum_two_numbers",
    title: "Sum Two Numbers",
    difficulty: "easy",
    summary: "Read two integers from standard input and print their sum.",
    inputFormat: ["One line with two space-separated integers `a` and `b`."],
    outputFormat: ["Print a single integer: `a + b`."],
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
    inputFormat: ["One line with three space-separated integers."],
    outputFormat: ["Print the maximum value among the three integers."],
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
    outputFormat: ["Print one integer: the count of even numbers."],
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
  {
    id: "prefix_sum_queries",
    title: "Prefix Sum Queries",
    difficulty: "hard",
    summary: "Given an array and several inclusive ranges `[l, r]`, print the sum of each range.",
    inputFormat: [
      "First line: `n q`.",
      "Second line: `n` integers.",
      "Next `q` lines: two 1-based indices `l r`.",
    ],
    outputFormat: ["Print one line per query with the range sum."],
    approach: [
      "Build a prefix sum array where `prefix[i]` stores the sum of the first `i` elements.",
      "Answer each query in `O(1)` using `prefix[r] - prefix[l - 1]`.",
      "Pay attention to 1-based input indices.",
    ],
    samples: [
      { input: "5 3\n1 2 3 4 5\n1 3\n2 5\n4 4", output: "6\n14\n4" },
      { input: "4 2\n10 -2 7 1\n1 4\n3 4", output: "16\n8" },
    ],
    starterCode: `use std::io::{self, Read};

fn main() {
  let mut input = String::new();
  io::stdin().read_to_string(&mut input).unwrap();
  let mut it = input.split_whitespace();

  let n: usize = it.next().unwrap().parse().unwrap();
  let q: usize = it.next().unwrap().parse().unwrap();

  let mut nums = vec![0i64; n];
  for i in 0..n {
    nums[i] = it.next().unwrap().parse().unwrap();
  }

  // TODO: build prefix sums.
  // let prefix = ...

  let mut out = Vec::with_capacity(q);
  for _ in 0..q {
    let l: usize = it.next().unwrap().parse().unwrap();
    let r: usize = it.next().unwrap().parse().unwrap();
    // TODO: answer the query.
    let answer = 0i64;
    out.push(answer.to_string());
  }

  println!("{}", out.join("\\n"));
}
`,
  },
  {
    id: "balanced_brackets",
    title: "Balanced Brackets",
    difficulty: "hard",
    summary: "Given one string containing only brackets, decide whether it is balanced.",
    inputFormat: ["One line containing a bracket string such as `([]{})`."],
    outputFormat: ["Print `YES` if the brackets are balanced, otherwise print `NO`."],
    approach: [
      "Use a stack.",
      "Push opening brackets.",
      "When a closing bracket appears, check whether it matches the current top of the stack.",
      "The string is balanced only if every close matches and the stack ends empty.",
    ],
    samples: [
      { input: "([]{})", output: "YES" },
      { input: "([)]", output: "NO" },
    ],
    starterCode: `use std::io::{self, Read};

fn main() {
  let mut input = String::new();
  io::stdin().read_to_string(&mut input).unwrap();
  let s = input.trim();

  let mut stack: Vec<char> = Vec::new();

  // TODO: validate the bracket sequence.
  let answer = "NO";

  println!("{answer}");
}
`,
  },
  {
    id: "longest_unique_substring",
    title: "Longest Unique Substring Length",
    difficulty: "hard",
    summary: "Given a lowercase string, print the length of the longest substring with no repeated characters.",
    inputFormat: ["One line containing a lowercase ASCII string."],
    outputFormat: ["Print one integer: the maximum unique-substring length."],
    approach: [
      "Use a sliding window.",
      "Track the most recent index of each character.",
      "Move the left edge forward whenever a repeated character appears inside the current window.",
    ],
    samples: [
      { input: "abcabcbb", output: "3" },
      { input: "abba", output: "2" },
    ],
    starterCode: `use std::collections::HashMap;
use std::io::{self, Read};

fn main() {
  let mut input = String::new();
  io::stdin().read_to_string(&mut input).unwrap();
  let s = input.trim().as_bytes();

  let mut last_seen: HashMap<u8, usize> = HashMap::new();

  // TODO: implement a sliding window.
  let answer = 0usize;

  println!("{answer}");
}
`,
  },
];
