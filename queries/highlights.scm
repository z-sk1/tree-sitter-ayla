(keyword) @keyword

(boolean) @constant.builtin
(nil) @constant.builtin

; Types
(primitive_type) @type.builtin
(type_identifier) @type

; Structs
(struct_decl
  name: (type_identifier) @type.definition)

(struct_field
  name: (identifier) @variable.other.member)

(struct_field
  type: (type_identifier) @type)

(struct_field
  type: (primitive_type) @type.builtin)


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

; Comments
(comment) @comment
