export interface InterviewQuestion {
  id: string;
  level: "junior" | "mid" | "senior";
  topic: string;
  title: string;
  prompt: string[];
  options: string[];
  answer: number;
  explanation: string;
}

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: "ownership_move_reason",
    level: "junior",
    topic: "ownership",
    title: "Why moves exist",
    prompt: [
      "Why does Rust move many values by default instead of silently allowing many unrestricted owners?",
    ],
    options: [
      "Ownership rules make aliasing and mutation constraints explicit, helping memory safety without a GC by default.",
      "Because Rust cannot copy bits.",
      "Because moves make the language dynamically typed.",
    ],
    answer: 0,
    explanation:
      "Moves are part of Rust’s ownership model for controlling aliasing and resource lifetime safely.",
  },
  {
    id: "borrow_vs_move",
    level: "junior",
    topic: "ownership",
    title: "Borrow versus move",
    prompt: [
      "A function only needs to read a value temporarily. What is usually the best first API instinct?",
    ],
    options: [
      "Take a borrow if ownership transfer is unnecessary.",
      "Take ownership of every argument by default.",
      "Use `unsafe` to bypass the borrow checker.",
    ],
    answer: 0,
    explanation:
      "APIs should ask for the least ownership they need. Borrowing is often the clearest expression of temporary read access.",
  },
  {
    id: "mutability_aliasing",
    level: "junior",
    topic: "ownership",
    title: "Mutability and aliasing",
    prompt: [
      "Why is `&mut` more restrictive than `&`?",
    ],
    options: [
      "Rust is controlling aliasing around mutation so conflicting access is prevented at compile time.",
      "Because mutable references are slower to print.",
      "Because immutable references live only on the heap.",
    ],
    answer: 0,
    explanation:
      "The restriction is about correctness and exclusive access, not printing or storage location.",
  },
  {
    id: "shadowing_vs_mutation",
    level: "junior",
    topic: "bindings",
    title: "Shadowing versus mutation",
    prompt: [
      "Why is it useful to distinguish shadowing from mutation clearly in Rust?",
    ],
    options: [
      "Shadowing creates a new binding, while mutation changes the value behind an existing mutable binding.",
      "They are exactly the same feature with two names.",
      "Shadowing is only for macros.",
    ],
    answer: 0,
    explanation:
      "This distinction matters for reasoning about ownership, type changes, and immutability.",
  },
  {
    id: "option_result_difference",
    level: "junior",
    topic: "error handling",
    title: "Option versus Result",
    prompt: [
      "What is the strongest distinction between `Option<T>` and `Result<T, E>`?",
    ],
    options: [
      "`Option` models presence or absence, while `Result` models success or failure with error information.",
      "`Option` is for async code only.",
      "`Result` can only be used in macros.",
    ],
    answer: 0,
    explanation:
      "They solve different modeling problems even though both are enums that express alternative cases.",
  },
  {
    id: "struct_trait_enum_map",
    level: "junior",
    topic: "types",
    title: "Struct, trait, enum roles",
    prompt: [
      "Why is it useful to distinguish `struct`, `trait`, and `enum` clearly in Rust interviews?",
    ],
    options: [
      "Because data shape, shared behavior, and variant modeling are different design dimensions.",
      "Because they are all aliases for classes.",
      "Because only enums can have methods.",
    ],
    answer: 0,
    explanation:
      "Strong Rust answers separate representation, behavior abstraction, and variant modeling rather than mixing them together.",
  },
  {
    id: "copy_value_type_reason",
    level: "junior",
    topic: "traits",
    title: "Why Copy feels like value semantics",
    prompt: [
      "Why can a `Copy` type feel more like a traditional value type in day-to-day Rust use?",
    ],
    options: [
      "Because assignments and argument passing duplicate the value implicitly instead of moving exclusive ownership away.",
      "Because `Copy` types are stored outside memory.",
      "Because `Copy` disables type checking.",
    ],
    answer: 0,
    explanation:
      "Implicit duplication changes how assignment and passing behave, which is why `Copy` often maps to value-semantic intuition.",
  },
  {
    id: "match_exhaustiveness",
    level: "junior",
    topic: "enums",
    title: "Why exhaustive matching matters",
    prompt: [
      "Why is exhaustive `match` a big deal in Rust design?",
    ],
    options: [
      "It forces handling of all represented states, which helps keep control flow aligned with data modeling.",
      "It makes enums faster than structs automatically.",
      "It exists only for style consistency.",
    ],
    answer: 0,
    explanation:
      "Exhaustiveness turns variant modeling into a compile-time correctness tool rather than just a documentation hint.",
  },
  {
    id: "trait_bound_reasoning",
    level: "mid",
    topic: "traits",
    title: "Trait bounds as capability contracts",
    prompt: [
      "Why are trait bounds important beyond satisfying the compiler?",
    ],
    options: [
      "They describe what operations generic code is allowed to assume about a type parameter.",
      "They make all generic code slower.",
      "They remove the need for functions.",
    ],
    answer: 0,
    explanation:
      "Trait bounds are part of API design because they describe the capability contract required by generic code.",
  },
  {
    id: "lifetime_api_design",
    level: "mid",
    topic: "lifetimes",
    title: "Lifetimes as API design clues",
    prompt: [
      "A lifetime error appears. Why is it often useful to rethink the API instead of only fighting syntax?",
    ],
    options: [
      "Because the error may reveal that ownership or data-flow structure is poorly expressed.",
      "Because lifetimes are random compiler guesses.",
      "Because lifetimes only matter in tests.",
    ],
    answer: 0,
    explanation:
      "Lifetime errors often point at deeper design issues around who owns data and how long references should remain valid.",
  },
  {
    id: "copy_clone_difference",
    level: "mid",
    topic: "traits",
    title: "Copy versus Clone",
    prompt: [
      "Why is `Copy` different from `Clone` conceptually?",
    ],
    options: [
      "`Copy` means duplication happens implicitly on assignment-like moves, while `Clone` is an explicit duplication operation.",
      "`Clone` is always cheaper than `Copy`.",
      "They are identical except for naming.",
    ],
    answer: 0,
    explanation:
      "This difference matters for API expectations and ownership clarity.",
  },
  {
    id: "iterator_zero_cost",
    level: "mid",
    topic: "iterators",
    title: "Iterator design reasoning",
    prompt: [
      "Why do Rust interviews often emphasize iterators rather than only loops?",
    ],
    options: [
      "Iterators showcase ownership, laziness, combinators, and zero-cost abstraction reasoning together.",
      "Because loops are forbidden in Rust.",
      "Because iterators automatically allocate less memory in all cases.",
    ],
    answer: 0,
    explanation:
      "Iterators are a good lens into how Rust expresses high-level structure without necessarily paying runtime abstraction cost.",
  },
  {
    id: "result_question_mark_reason",
    level: "mid",
    topic: "error handling",
    title: "Why `?` matters",
    prompt: [
      "Why is the `?` operator more than just syntax sugar for shorter code?",
    ],
    options: [
      "It encodes structured early-return propagation that works with types implementing the relevant residual semantics.",
      "It disables error handling so functions can continue running.",
      "It can only be used with `panic!`.",
    ],
    answer: 0,
    explanation:
      "The operator expresses control flow and type-level propagation behavior, not merely shorter spelling.",
  },
  {
    id: "trait_object_vs_generic",
    level: "mid",
    topic: "traits",
    title: "Trait objects versus generics",
    prompt: [
      "What is the main design distinction between using a trait object and using a generic type parameter?",
    ],
    options: [
      "Trait objects favor runtime polymorphism behind a uniform interface, while generics preserve compile-time specialization and static type identity.",
      "Generics always allocate, trait objects never do.",
      "Trait objects are only for async code.",
    ],
    answer: 0,
    explanation:
      "This choice affects dispatch, code shape, extensibility, and what information is preserved at compile time.",
  },
  {
    id: "async_future_poll",
    level: "mid",
    topic: "async",
    title: "Async runtime mental model",
    prompt: [
      "What is the key mental model behind a Rust `Future`?",
    ],
    options: [
      "A future is a value representing asynchronous progress that can be polled toward completion.",
      "A future is a background OS thread by itself.",
      "A future is always already running before being created.",
    ],
    answer: 0,
    explanation:
      "Rust async is structured around state machines and polling, not the assumption that every async value is just a thread.",
  },
  {
    id: "send_sync_reasoning",
    level: "mid",
    topic: "concurrency",
    title: "Send and Sync reasoning",
    prompt: [
      "Why are `Send` and `Sync` important interview concepts in Rust concurrency?",
    ],
    options: [
      "They express whether ownership or shared references can cross thread boundaries safely under Rust’s rules.",
      "They are networking traits for TCP only.",
      "They only affect debug builds.",
    ],
    answer: 0,
    explanation:
      "These auto traits encode thread-safety properties that strongly shape what concurrent designs are legal.",
  },
  {
    id: "arc_mutex_choice",
    level: "mid",
    topic: "concurrency",
    title: "Arc<Mutex<T>> reasoning",
    prompt: [
      "Why is `Arc<Mutex<T>>` common in concurrent Rust examples?",
    ],
    options: [
      "It combines shared ownership with synchronized mutable access across threads.",
      "It eliminates all contention automatically.",
      "It is required for every struct.",
    ],
    answer: 0,
    explanation:
      "Each piece solves a different problem: shared ownership and synchronized mutation.",
  },
  {
    id: "pin_reasoning",
    level: "senior",
    topic: "async",
    title: "Why pinning exists",
    prompt: [
      "Why does `Pin` exist in Rust instead of the language pretending values can always be moved freely?",
    ],
    options: [
      "Some abstractions rely on stable memory location for soundness, especially self-referential or async-generated state-machine patterns.",
      "Because pinned values run faster in every case.",
      "Because the stack cannot store ordinary values.",
    ],
    answer: 0,
    explanation:
      "Pinning is a soundness boundary around move semantics, not a universal optimization knob.",
  },
  {
    id: "unsafe_boundary_meaning",
    level: "senior",
    topic: "unsafe",
    title: "Unsafe as a boundary",
    prompt: [
      "What is the strongest senior-level way to talk about `unsafe`?",
    ],
    options: [
      "`unsafe` should mark a small boundary where extra invariants must be upheld and documented, not an excuse to abandon design discipline.",
      "`unsafe` means the compiler stops checking anything anywhere.",
      "`unsafe` is how all high-performance Rust must be written.",
    ],
    answer: 0,
    explanation:
      "Strong Rust engineering keeps unsafe narrow, justified, and wrapped in safer abstractions where possible.",
  },
  {
    id: "ffi_boundary_design",
    level: "senior",
    topic: "ffi",
    title: "FFI boundary design",
    prompt: [
      "Why is FFI a design boundary rather than only a linking concern?",
    ],
    options: [
      "Because ownership, layout, lifetimes, panics, and error conventions must be translated across language and runtime assumptions.",
      "Because foreign code cannot use memory.",
      "Because Rust automatically proves every foreign invariant.",
    ],
    answer: 0,
    explanation:
      "Cross-language calls are where different safety and lifetime models meet, so the boundary must be designed deliberately.",
  },
  {
    id: "interior_mutability_tradeoff",
    level: "senior",
    topic: "ownership",
    title: "Interior mutability tradeoff",
    prompt: [
      "Why is interior mutability a design tradeoff instead of simply a more flexible default?",
    ],
    options: [
      "It can enable useful APIs, but it moves some borrow-rule enforcement from compile time to runtime or abstraction invariants.",
      "It removes all need for ownership reasoning.",
      "It means mutation becomes thread-safe automatically.",
    ],
    answer: 0,
    explanation:
      "Flexibility is gained by shifting where correctness is enforced, which changes failure modes and API expectations.",
  },
  {
    id: "borrow_checker_design_signal",
    level: "senior",
    topic: "ownership",
    title: "Borrow checker as design signal",
    prompt: [
      "Why do experienced Rust engineers sometimes say the borrow checker is pointing at a design issue, not merely a compiler annoyance?",
    ],
    options: [
      "Because rejected borrowing patterns often reveal unclear ownership boundaries, oversized functions, or poorly chosen data flow.",
      "Because the borrow checker prefers shorter variable names.",
      "Because every borrow error requires `unsafe` as the real fix.",
    ],
    answer: 0,
    explanation:
      "Many hard borrow errors are symptoms of design structure that is fighting the ownership model.",
  },
  {
    id: "async_blocking_hazard",
    level: "senior",
    topic: "async",
    title: "Blocking inside async",
    prompt: [
      "Why is blocking work inside async tasks a common architectural interview concern?",
    ],
    options: [
      "Because blocking can starve executor threads and damage latency or throughput assumptions of the async runtime.",
      "Because async code cannot call ordinary functions.",
      "Because blocked tasks become memory-safe errors automatically.",
    ],
    answer: 0,
    explanation:
      "Async structure depends on cooperative progress. Blocking at the wrong point can undermine the whole concurrency model.",
  },
  {
    id: "macro_api_tradeoff",
    level: "senior",
    topic: "macros",
    title: "Macro tradeoff",
    prompt: [
      "Why should a strong Rust engineer be cautious about solving every ergonomic problem with macros?",
    ],
    options: [
      "Macros can unlock powerful APIs, but they also hide control flow, complicate diagnostics, and increase abstraction surface area.",
      "Macros are always slower than functions.",
      "Macros cannot generate valid Rust syntax.",
    ],
    answer: 0,
    explanation:
      "Macros are powerful, but they move complexity into expansion and tooling experience, which is a real design cost.",
  },
  {
    id: "crate_boundary_architecture",
    level: "senior",
    topic: "architecture",
    title: "Crate boundaries and architecture",
    prompt: [
      "Why do crate boundaries matter in larger Rust systems beyond just build organization?",
    ],
    options: [
      "They help encode ownership of APIs, visibility, compile-time dependency structure, and unsafe or platform boundary isolation.",
      "Because only crates can contain traits.",
      "Because modules cannot be tested.",
    ],
    answer: 0,
    explanation:
      "Package structure is part of system architecture because it shapes coupling and what invariants can be enforced where.",
  },
];
