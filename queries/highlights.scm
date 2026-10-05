; Variables
(identifier) @variable
(member_expression
  property: (identifier) @variable.other.member)

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
  "fun" @keyword)

(function_decl
  name: (identifier) @function.definition)

(parameter
    name: (identifier) @variable.parameter)

(parameter
    type: (primitive_type) @type.builtin)

(parameter
    type: (type_identifier) @type)

(call_expression
  function: (identifier) @function.call)

(receiver
  name: (identifier) @variable.parameter)

(receiver
  type: (type_identifier) @type)

(return_type
  type: (type_identifier) @type)

(return_type
  type: (primitive_type) @type.builtin)

; Literals
(string) @string
(number) @number

; Comments
(comment) @comment


"fun" @keyword
"struct" @keyword
"ayla" @keyword
"elen" @keyword
"for" @keyword
"while" @keyword
"give" @keyword
"import" @keyword
"defer" @keyword
"start" @keyword
"choose" @keyword
"select" @keyword
"when" @keyword
"otherwise" @keyword
"snap" @keyword
"say" @keyword
"keep" @keyword
"with" @keyword
"map" @keyword
"range" @keyword
"interface" @keyword
"type" @keyword
"enum" @keyword
"chan" @keyword
