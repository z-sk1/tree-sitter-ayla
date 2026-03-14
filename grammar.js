module.exports = grammar({
  name: "ayla",

  extras: ($) => [/\s/, $.comment],

  word: ($) => $.identifier,

  rules: {
    source_file: ($) => repeat($._statement),

    _statement: ($) =>
      choice($.struct_decl, $.function_decl, $.expression, $.assignment),

    assignment: ($) =>
      seq(field("left", $.identifier), "=", field("right", $.expression)),

    struct_decl: ($) =>
      seq(
        field("keyword", "struct"),
        field("name", $.type_identifier),
        "{",
        repeat($.struct_field),
        "}",
      ),

    struct_field: ($) =>
      seq(
        field("name", $.identifier),
        field("type", choice($.type_identifier, $.primitive_type)),
      ),

    parameter: ($) =>
      seq(
        field("name", $.identifier),
        optional(field("type", choice($.type_identifier, $.primitive_type))),
      ),

    parameter_list: ($) => seq($.parameter, repeat(seq(",", $.parameter))),

    receiver: ($) =>
      seq(
        "(",
        field("name", $.identifier),
        field("type", choice($.type_identifier, $.primitive_type)),
        ")",
      ),

    return_type: ($) =>
      seq("(", field("type", choice($.type_identifier, $.primitive_type)), ")"),

    function_decl: ($) =>
      seq(
        field("keyword", "fun"),
        optional(field("receiver", $.receiver)),
        field("name", $.identifier),
        "(",
        optional($.parameter_list),
        ")",
        optional(field("return_type", $.return_type)),
        $.block,
      ),

    block: ($) =>
      seq(field("open", "{"), repeat($._statement), field("close", "}")),

    keyword: ($) =>
      choice(
        "egg",
        "rock",
        "import",
        "enum",
        "struct",
        "map",
        "type",
        "ayla",
        "elen",
        "four",
        "why",
        "back",
        "kitkat",
        "next",
        "choose",
        "when",
        "otherwise",
        "spawn",
        "with",
        "it",
        "in",
        "range",
      ),

    primitive_type: ($) =>
      choice("int", "float", "string", "bool", "thing", "error"),

    binary_expression: ($) =>
      prec.left(
        seq(
          field("left", $.expression),
          field(
            "operator",
            choice(
              "+",
              "-",
              "*",
              "/",
              "%",
              "==",
              "!=",
              "<",
              ">",
              "<=",
              ">=",
              "&&",
              "||",
              "|",
              "&",
              "^",
              "<<",
              ">>",
            ),
          ),
          field("right", $.expression),
        ),
      ),

    expression: ($) =>
      choice(
        $.keyword,
        $.primitive_type,
        $.binary_expression,
        $.call_expression,
        $.member_expression,
        $.identifier,
        $.number,
        $.string,
        $.boolean,
        $.nil,
      ),

    call_expression: ($) =>
      seq(field("function", $.identifier), "(", optional($.argument_list), ")"),

    member_expression: ($) =>
      prec.left(
        seq(
          field("object", $.expression),
          ".",
          field("property", $.identifier),
        ),
      ),

    argument_list: ($) => seq($.expression, repeat(seq(",", $.expression))),

    identifier: ($) => /[a-z_][a-zA-Z0-9_]*/,

    type_identifier: ($) => /[A-Z][a-zA-Z0-9_]*/,

    number: ($) => /\d+/,

    string: ($) => /"[^"]*"/,

    boolean: ($) => choice("yes", "no"),

    nil: ($) => "nil",

    comment: ($) =>
      token(
        choice(seq("//", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),
      ),
  },
});
