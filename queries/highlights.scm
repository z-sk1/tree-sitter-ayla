; Keywords
"egg" @keyword
"rock" @keyword
"fun" @keyword
"type" @keyword
"struct" @keyword
"enum" @keyword
"int" @keyword
"float" @keyword
"string" @keyword
"bool" @keyword
"thing" @keyword
"map" @keyword

"ayla" @keyword
"elen" @keyword
"four" @keyword
"why" @keyword
"back" @keyword
"kitkat" @keyword
"next" @keyword
"decide" @keyword
"when" @keyword
"otherwise" @keyword
"spawn" @keyword
"with" @keyword
"it" @keyword
"in" @keyword
"range" @keyword

(boolean) @constant.builtin
(nil) @constant.builtin

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

; Comments
(comment) @comment
