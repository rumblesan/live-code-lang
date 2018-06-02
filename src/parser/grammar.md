# Grammar


```
start = Body

Body = EOF | Statements EOF

Statements = Statement | Statement NewLine Statements

EOF = NewLine End | End

Statement = Assignment
          | Application
          | Return

Assignment = Identifier '=' Expression

Application = Identifier '(' ArgList? ')'

Return = 'return' Expression

ArgList = Expression
        | Expression ',' ArgList

Expression = Number
           | Variable
           | Lambda
           | Application
           | Arithmatic

Arithmatic = Expression Operator Expression

Operator = '*' | '/' | '+' | '-'

Lambda = '(' NameList? ')' '=>' OpenBracket Statements CloseBracket

NameList = Identifier | Identifier ',' NameList
```
