FORMAT: 1A
HOST: http://127.0.0.1:3000

# API VUTTR

API do challenge de backend da BossaBox

# Group API

## Sobre [/]

API feita com NodeJS + Express + Sequelize com banco de dados MySQL!

# Group Usuario

## Usuario [/usuario]

### Criar Usuario [POST]

- Request (application/json)

   - Attributes (UsuarioCadastro)
   
   - Body
      
         
            {
               "name": "Bins",
               "email": "bins4@ig.com.br",
               "password": "123456"
            }

- Response 200 (application/json; charset=utf-8)

  - Attributes (Usuario)
  
  - Body
      
            {
                "id": 1,
                "name": "Bins",
                "email": "bins4@ig.com.br",
                "password_hash":"$2a$08$6YyV8YFCiVJxmZgW4GX6qeFPF.p/8Ey86Tt2A.i8vbS8JKfPtSQjy"
                "created_at": "2019-05-05T13:50:53.000Z",
                "updated_at": "2019-05-05T13:50:53.000Z"
            }   
  
- Response 403 (application/json; charset=utf-8)

  - Attributes (Message403)
  
  - Body
         
            {
                "message": "Usuário já existe"
            }   
  
## Login [/login]

### Faz o login do usuário, retornando um token [POST]

- Request (application/json)

   - Attributes (UsuarioLogin)

   - Body
      
            {
                "email": "bins4@ig.com.br",
                "password": "123456"
            }   

- Response 200 (application/json; charset=utf-8)

   - Attributes (UsuarioLogado)
  
   - Body
  
                {"user":{"id":1,"name":"Bins","email":"bins4@ig.com.br","password_hash":"$2a$08$6YyV8YFCiVJxmZgW4GX6qeFPF.p/8Ey86Tt2A.i8vbS8JKfPtSQjy","createdAt":"2019-05-05T13:50:53.000Z","updatedAt":"2019-05-05T13:50:53.000Z"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiQmlucyIsImVtYWlsIjoiYmluczRAaWcuY29tLmJyIiwicGFzc3dvcmRfaGFzaCI6IiQyYSQwOCQ2WXlWOFlGQ2lWSnhtWmdXNEdYNnFlRlBGLnAvOEV5ODZUdDJBLmk4dmJTOEpLZlB0U1FqeSIsImNyZWF0ZWRBdCI6IjIwMTktMDUtMDVUMTM6NTA6NTMuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMTktMDUtMDVUMTM6NTA6NTMuMDAwWiJ9LCJpYXQiOjE1NTcwNjQ4MTMsImV4cCI6MTU1NzE1MTIxM30.fg-5TWrVVAL1ebeTHDxd4s86z3cyxbWMhIk6aAVOc-o"}
  
- Response 401 (application/json; charset=utf-8)

   - Attributes (Message401)
  
   - Body 
   
            {
                "message": "Senha incorreta" 
            }
         
- Response 404 (application/json; charset=utf-8)

   - Attributes (Message404)
  
   - Body 
   
            {
                "message": "Usuário não encontrado" 
            }         


# Group Tools

## Tools [/tools]

### Listar Tools [GET]

- Request (application/json)
  
  
- Response 200 (application/json; charset=utf-8)

  - Attributes (array[ToolResponse])
  
  - Body
  
            [
            {
               "id": 1,
               "title": "Hello, world!",
               "link": "Hello, world!",
               "description": "Hello, world!",
               "tags": [
                 "Hello, world!"
               ]
            },
            {
               "id": 2,
               "title": "Hello, world!",
               "link": "Hello, world!",
               "description": "Hello, world!",
               "tags": [
                 "Hello, world!", "Hello, world!"
               ]
            }
            ]
         

### Criar Tools [POST]

- Request (application/json)

   - Headers

            Authentication: Bearer JWT

   - Attributes (Tool)
   
   - Body
   
            {"title": "Teste", "link": "http://www.google.com.br", "description":"Teste do Bins", "tags": ["tag1", "tag2", "tag3"] }

- Response 200 (application/json; charset=utf-8)
  
  - Attributes (ToolResponse)
  
  - Body 
  
            {
            "id": 1,
            "title": "Teste do Bins", 
            "link": "http://www.google.com.br", 
            "description":"Teste do Bins", 
            "tags": ["tag1", "tag2", "tag3"] 
            }
         
- Response 404 (application/json)
  
  - Attributes (MessageExiste)
  
  - Body

            {"message":"Tool já existe"}

# Group Tool

## Tool [/tools/{id_tool}]

### Detalhe Tool [GET]

- Parameters
      
   - id_tool: 1 (number, required) - ID da tool

- Request (application/json)
      
- Response 200 (application/json; charset=utf-8)

  - Attributes (ToolResponse)
  
  - Body 
  
            {
            "id": 1,
            "title": "Teste atualizado, 
            "link": "http://www.google.com.br", 
            "description":"Teste do Bins", 
            "tags": ["tag1", "tag2", "tag3"] 
            }

- Response 404 (application/json; charset=utf-8)
  
  - Attributes (MessageID)
  
  - Body

            {"message":"ID não localizado"}
   

### Atualizar tool [PUT]

- Parameters
      
   - id_tool: 1 (number, required) - ID da tool   

- Request (application/json)

   - Headers

            Authentication: Bearer JWT
   
   
   
   - Attributes (Tool)
   
   - Body
         
            {"title": "Teste atualizado", "link": "http://www.google.com.br", "description":"Teste do Bins", "tags": ["tag1", "tag2", "tag3"] }

- Response 200 (application/json; charset=utf-8)

  - Attributes (ToolResponse)
  
  - Body 
  
            {
                "id": 1,
                "title": "Teste atualizado, 
                "link": "http://www.google.com.br", 
                "description":"Teste do Bins", 
                "tags": ["tag1", "tag2", "tag3"] 
            }

- Response 404 (application/json; charset=utf-8)
  
  - Attributes (MessageID)
  
  - Body

            {"message":"ID não localizado"}

### Excluir Tool [DELETE]

- Parameters
      
   - id_tool: 1 (number, required) - ID da tool

- Request (application/json)

   - Headers

            Authentication: Bearer JWT

- Response 200 (application/json; charset=utf-8)

   - Attributes (MessageExcluido)
   
   - Body
         
            {"message":"Registro excluído"}
         
- Response 404 (application/json; charset=utf-8)
  
  - Attributes (MessageID)
  
  - Body
      
            {"message":"ID não localizado"}


# Data Structures

## Usuario (object)

- nome: Bins (string) - Nome
- email: bins@ig.com.br (string) - E-mail do usuário, deve ser único
- password_hash:$2a$08$6YyV8YFCiVJxmZgW4GX6qeFPF.p/8Ey86Tt2A.i8vbS8JKfPtSQjy (string) - Senha criptografada
- created_at:2019-05-05T13:50:53.000Z (string) - Data de criação
- updated_at:2019-05-05T13:50:53.000Z (string) - Data de atualização

## UsuarioCadastro (object)

- nome: Bins (string) - Nome
- email: bins@ig.com.br (string) - E-mail do usuário, deve ser único
- password: 123456 (string) - Senha do usuário

## UsuarioLogin (object)

- email: bins@ig.com.br (string) - E-mail do usuário, deve ser único
- password: 123456 (string) - Senha do usuário

## UsuarioLogado (object)

- id:1 (number) - ID do registro
- nome: Bins (string) - Nome
- email: bins@ig.com.br (string) - E-mail do usuário, deve ser único
- password_hash:$2a$08$6YyV8YFCiVJxmZgW4GX6qeFPF.p/8Ey86Tt2A.i8vbS8JKfPtSQjy (string) - Senha
- token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiQmlucyIsImVtYWlsIjoiYmluczRAaWcuY29tLmJyIiwicGFzc3dvcmRfaGFzaCI6IiQyYSQwOCQ2WXlWOFlGQ2lWSnhtWmdXNEdYNnFlRlBGLnAvOEV5ODZUdDJBLmk4dmJTOEpLZlB0U1FqeSIsImNyZWF0ZWRBdCI6IjIwMTktMDUtMDVUMTM6NTA6NTMuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMTktMDUtMDVUMTM6NTA6NTMuMDAwWiJ9LCJpYXQiOjE1NTcwNjQ4MTMsImV4cCI6MTU1NzE1MTIxM30.fg-5TWrVVAL1ebeTHDxd4s86z3cyxbWMhIk6aAVOc-o (string) - Token para ser utilizado nas rotas restritas


## MessageExiste (object)

- message: Tool já existe (string) - Retorno da operação

## MessageID (object)

- message: ID não localizado (string) - Retorno da operação

## Message403 (object)

- message: Usuário já existe (string) - Retorno da operação

## Message404 (object)

- message: Usuário não encontrado (string) - Retorno da operação

## MessageExcluido (object)

- message: Registro excluído (string) - Retorno da operação

## Message401 (object)

- message: Senha incorreta (string) - Retorno da operação


## Tool (object)

- title: Teste (string) - Nome da Tool
- link: http://www.google.com.br(string) - Link
- description: Teste (string) - Descrição
- tags: ["tag1", "tag2", "tag3"] (array[string]) - Array de strings com o nome das tags

## ToolResponse (object)

- id: 1 (number) - ID do registro
- title: Teste (string) - Nome da Tool
- link: http://www.google.com.br (string) - Link
- description: Teste (string) - Descrição
- tags: ["tag1", "tag2", "tag3"] (array[string]) - Array de strings com o nome das tags