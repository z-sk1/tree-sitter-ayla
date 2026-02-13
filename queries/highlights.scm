; Keywords
"struct" @keyword
"fun" @keyword

; Types
(type_identifier) @type

(struct_decl
  name: (type_identifier) @type.definition)

; Functions
(function_decl
  name: (identifier) @function.definition)

(call_expression
  function: (identifier) @function.call)

; Variables
(identifier) @variable

(member_expression
  property: (identifier) @variable.other.member)

; Literals
(string) @string
(number) @number
(boolean) @constant.builtin
(nil) @constant.builtin

; Comments
(comment) @comment
