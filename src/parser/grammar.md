# Grammar


```
start = Body

Body = EOF | Statements EOF

Statements = Statement | Statement NewLine Statements

EOF = NewLine End | End

Statement = Assignment
          | Application
          | If
          | Loop
          | Return

Assignment = Identifier '=' Expression

Application = Identifier '(' ArgList? ')'

If = IfBlock ElseBlock?

IfBlock = 'if' Expression OpenBracket NewLine Statements CloseBracket

ElseBlock = 'else' OpenBracket NewLine Statements CloseBracket

Loop = 'loop' Expression 'times' OpenBracket Newline Statements CloseBracket
     | 'loop' Expression 'times' 'with' Identifier OpenBracket Newline Statements CloseBracket

Return = 'return' Expression

ArgList = Expression
        | Expression ',' ArgList

Expression = Number
           | '-' Expression
           | Variable
           | Lambda
           | Application
           | Arithmatic

Arithmatic = Expression Operator Expression

Operator = '==' | '^' | '*' | '/' | '+' | '-' | '%' | '<' | '>' | '<=' | '>='

Lambda = '(' NameList? ')' '=>' OpenBracket NewLine Statements CloseBracket
       | '(' NameList? ')' '=>' OpenBracket Expression CloseBracket

NameList = Identifier | Identifier ',' NameList
```
