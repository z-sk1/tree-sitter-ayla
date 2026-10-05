export default grammar({
  name: "ayla",

  extras: ($) => [
    /\s/,
    $.comment,
  ],

  word: ($) => $.identifier,

  rules: {
    source_file: ($) => repeat($._statement),

    _statement: ($) =>
      choice(
        $.struct_decl,
        $.function_decl,
        $.assignment,
        $.expression_statement,
      ),

    expression_statement: ($) => $.expression,

    assignment: ($) =>
      seq(
        field("left", $.identifier),
        "=",
        field("right", $.expression),
      ),

    struct_decl: ($) =>
      seq(
        "struct",
        field("name", $.type_identifier),
        "{",
        repeat($.struct_field),
        "}",
      ),

    struct_field: ($) =>
      seq(
        field("name", $.identifier),
        field("type", choice($.primitive_type, $.type_identifier)),
      ),

    function_decl: ($) =>
      seq(
        "fun",
        optional($.receiver),
        field("name", $.identifier),
        "(",
        optional($.parameter_list),
        ")",
        optional($.return_type),
        $.block,
      ),

    receiver: ($) =>
      seq(
        "(",
        field("name", $.identifier),
        field("type", choice($.primitive_type, $.type_identifier)),
        ")",
      ),

    parameter_list: ($) =>
      seq($.parameter, repeat(seq(",", $.parameter))),

    parameter: ($) =>
      seq(
        field("name", $.identifier),
        optional(field("type", choice($.primitive_type, $.type_identifier))),
      ),

    return_type: ($) =>
      seq(
        "(",
        field("type", choice($.primitive_type, $.type_identifier)),
        ")",
      ),

    block: ($) =>
      seq(
        "{",
        repeat($._statement),
        "}",
      ),

    expression: ($) =>
      choice(
        $.binary_expression,
        $.call_expression,
        $.member_expression,
        $.parenthesized_expression,
        $.identifier,
        $.number,
        $.string,
        $.boolean,
        $.nil,
      ),

    parenthesized_expression: ($) =>
      seq("(", $.expression, ")"),

    binary_expression: ($) =>
      prec.left(
        seq(
          field("left", $.expression),
          field("operator", $.operator),
          field("right", $.expression),
        ),
      ),

    member_expression: ($) =>
      prec.left(
        2,
        seq(
          field("object", $.expression),
          ".",
          field("property", $.identifier),
        ),
      ),

    call_expression: ($) =>
      prec(
        3,
        seq(
          field("function", $.expression),
          "(",
          optional($.argument_list),
          ")",
        ),
      ),

    argument_list: ($) =>
      seq(
        $.expression,
        repeat(seq(",", $.expression)),
      ),

    operator: ($) =>
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
      ),

    primitive_type: ($) =>
      choice(
        "int",
        "float",
        "string",
        "bool",
        "thing",
        "error",
      ),

    identifier: ($) => /[a-z_][a-zA-Z0-9_]*/,

    type_identifier: ($) => /[A-Z][a-zA-Z0-9_]*/,

    number: ($) => /\d+/,

    string: ($) => /"[^"]*"/,

    boolean: ($) => choice("yes", "no"),

    nil: ($) => "nil",

    comment: ($) =>
      token(choice(
        seq("//", /.*/),
        seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"),
      )),
  },
});