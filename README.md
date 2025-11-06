# 🐳 Projeto Node + Docker

Este projeto foi desenvolvido para criar um ambiente **Node.js** totalmente **containerizado com Docker** — fácil de configurar, rápido de rodar e sem dores de cabeça com dependências locais. 🚀

---

## 📦 Pré-requisitos

Antes de tudo, é necessário instalar:

### 🧰 1. Docker
Baixe e instale o **Docker Desktop** (ou apenas o Docker Engine, se estiver no Linux):

🔗 [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

### ⚙️ 2. Docker Compose
O Docker Desktop já inclui o Docker Compose.  
Se estiver usando Linux e precisar instalar manualmente:

🔗 [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

Verifique se tudo está funcionando com os comandos abaixo:

```bash
docker --version
docker compose version
```

---

## 🗂️ Estrutura do Projeto

A estrutura do projeto foi organizada para separar claramente o ambiente **do backend Node.js** do ambiente **Docker geral**.

```
📁 node-docker
 ┣ 📁 backEnd
 │  ┣ 📄 app.js              ← Aplicação Node.js
 │  ┣ 📄 database.js         ←  Arquivo de conexão com o banco de dados
 │  ┣ 📄 Dockerfile   
 │  ┗ 📄 .env                ← Variáveis do projeto Node (ex: porta, DB, etc)
 ┣ 📄 docker-compose.yml     ← Configuração dos containers
 ┗ 📄 .env                   ← Variáveis usadas pelo Docker Compose
```

---

## ⚙️ Configuração de Ambiente

O projeto utiliza **dois arquivos `.env`** — um para o **backend** e outro para o **Docker Compose**.

### 1️⃣ `.env` (para o backend)

Esse arquivo contém as variáveis usadas diretamente pela aplicação Node:

```env
PORT=3000
DB_HOST=localhost
DB_USER=teste
DB_PASS=teste
DB_NAME=teste
DB_PORT=3306
```

### 2️⃣ `.env` (na raiz, usado pelo Docker Compose)

Essas variáveis são usadas para configurar os containers e comunicar o backend com o banco de dados dentro da rede Docker:

```env
ROOT_PASSWORD=rootpassword
DB_NAME=teste
DB_USER=teste
DB_PASS=teste
DB_PORT=3306
PORT=3000
```

> 💡 Dica:  
> O `.env` dentro da pasta `backEnd` é lido pela aplicação Node, enquanto o `.env` na raiz é usado pelo `docker-compose.yml`.

---
## 🧩 Ajustando os privilégios do banco de dados MySQL

Após subir o **backEnd** com o Docker, a aplicação **Node.js** pode não conseguir se conectar ao banco de dados imediatamente.  
Isso ocorre porque o usuário padrão do MySQL ainda não possui os privilégios necessários para acessar o banco de dados de forma remota (por exemplo, a partir do container da aplicação).

### ⚙️ Passos para corrigir

1. Acesse o container do MySQL:
   ```bash
   docker exec -it nome_do_container_mysql bash
   ```

2. Entre no MySQL como **root**:
   ```bash
   mysql -u root -p
   ```
   (A senha é a mesma configurada na variável `MYSQL_ROOT_PASSWORD` do seu `.env`)

3. Dentro do MySQL, execute os seguintes comandos:
   ```sql
   GRANT ALL PRIVILEGES ON *.* TO 'usuario_padrao'@'%' IDENTIFIED BY 'sua_senha' WITH GRANT OPTION;
   FLUSH PRIVILEGES;
   ```

   - `usuario_padrao`: substitua pelo nome de usuário definido no seu `.env` (ex: `DB_USER`).
   - `sua_senha`: senha configurada para esse usuário.
   - O símbolo `%` permite que o usuário se conecte de **qualquer host**, incluindo outros containers.

4. Saia do MySQL e do container:
   ```bash
   exit
   ```

Após esses passos, a aplicação **Node.js** poderá se conectar normalmente ao banco de dados MySQL.

---

## 🧱 Construindo o Container

Após configurar os arquivos `.env`, basta rodar:

```bash
docker compose up --build
```

Isso fará:
- Criar a imagem do backend Node.js  
- Criar o container do banco de dados (se houver)  
- Rodar a aplicação automaticamente 🎉

---

## 🧰 Instalando Dependências no Container

Se você quiser instalar uma nova dependência no projeto — como o **Express**, **Nodemon**, ou uma biblioteca de banco de dados (por exemplo, **mysql**) — você pode fazer isso **diretamente dentro do container**.

### 👣 Passo a passo:

1. **Entre no container Node:**

   ```bash
   docker exec -it nome_do_container bash
   ```

   > 💡 Dica: use `docker ps` para ver o nome do container ativo.

2. **Dentro do container, instale o que precisar:**

   ```bash
   npm install express
   npm install nodemon --save-dev
   npm install mysql2
   ```

3. **Saia do container:**

   ```bash
   exit
   ```

4. **Atualize a imagem (opcional, mas recomendado):**

   ```bash
   docker compose build
   ```

> 💬 Observação:  
> As dependências instaladas ficam salvas na pasta `node_modules` dentro do volume montado pelo Docker, então não serão perdidas mesmo após reiniciar o container (desde que o volume esteja configurado).

---

## 🔍 Verificando o Funcionamento

Quando a aplicação estiver rodando, acesse:

👉 [http://localhost:3000](http://localhost:3000)

Você deve ver a aplicação do Node.js em execução.

Para verificar os logs:

```bash
docker compose logs -f
```

---

## 🧹 Parando e Limpando Containers

Para parar o ambiente:

```bash
docker compose down
```

Se quiser remover tudo (containers, volumes, imagens):

```bash
docker compose down --volumes --rmi all
```

---

## 💬 Dúvidas Frequentes

**❓ O Node precisa estar instalado na máquina?**  
> Não! Todo o ambiente Node está dentro do container. Basta ter o Docker instalado.

**❓ Como adiciono novas dependências sem sair do Docker?**  
> Use o comando `docker exec -it nome_do_container bash` e instale o pacote desejado normalmente com `npm install`.

**❓ Posso alterar as portas?**  
> Sim! Modifique a variável `PORT` no `.env` e ajuste o `ports` no `docker-compose.yml`.

**❓ Onde ficam os logs?**  
> Dentro do container, mas você pode ver tudo via `docker compose logs`.

---

## 🧡 Contribuição

Sinta-se à vontade para contribuir, abrir *issues* e sugerir melhorias!  
Feito com ☕ e 🧠 por **Dereck Silva**.
