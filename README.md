# Desafio XP

![GitHub repo size](https://img.shields.io/github/repo-size/iuricode/README-template?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/iuricode/README-template?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/iuricode/README-template?style=for-the-badge)

<img src="exemplo-image.png" alt="exemplo imagem">

### Descrição

Esta API tem como objetivo simular transações de compra e venda de ações, suas funcionalidades incluem:

- Cadastra novo usuário
- Realizar consulta de compra e venda de uma ou todas as operações do usuário
- Compra uma ação disponível
- Vende uma ação que você possui
- Realiza depositos na conta do usuário
- Realiza saques na conta do usuário
- Realiza consulta de todas as ações
- Realiza consulta de uma ação específica
- Realiza consulta de ações que o usuário possui


### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [x] Criar DER
- [x] Dockerizar a aplicação
- [x] Criar os endpoints
- [x] Aplicar regras de negócio
- [ ] Implementar middlewares de validações
- [ ] Criar autenticação e autorização JWT
- [ ] Alimentar o banco de dados com dados de investimento
- [ ] Implementar API SWAGGER
- [ ] Testar a aplicação
- [ ] Realizar o deploy da aplicação

## Aprendizados

#### Soft Skills
- Esse projeto está sendo realizado em paralelo com o curso de formação em desenvolvimento web, acho que um dos principais aprendizados que eu tive foi o fato de elaborar uma gestão de tempo eficiente, para conseguir realizar tudo com excelência.

#### Hard Skills

- Tive problemas com assincronismos entre a integração MSC, um ponto de atenção que sempre levarei em conta é em sempre me atentar onde receberei uma promise e como tratarei esse dado.
- Precisei de buscar uma solução para popular o banco de dados sempre que alguém clonasse o repositório e inicializasse o projeto, automaticamente.
- Criar o banco de dados do zero, abstraindo os relacionamentos de cada tabela, quais dados incluir em cada tabela não foi uma tarefa fácil, porém extremamente agregadora, sinto que isso trouxe uma confiança indispensável para a criação de futuras arquiteturas.
- Dockerizar a aplicação não é algo que tenho tanta maestria, pude desenvolver essa habilidade durante essa aplicação.


## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:
* Esta aplicação conta com a dockerização do Node e do Banco MYSQL
* Você instalou a versão mais recente do `Docker e Docker compose`

## 🚀 Instalando Desafio XP

Para instalar o Desafio XP, siga estas etapas:

Inicialize os containers, Digite no terminal, dentro da pasta em que se encontra seu projeto:
```
docker-compose up -d
```

Após inicializar os containers, inicialize o projeto:

```
npm start
```

## ☕ Usando a API Desafio XP

Para usar <nome_do_projeto>, siga estas etapas:

```
<exemplo_de_uso>
```

Adicione comandos de execução e exemplos que você acha que os usuários acharão úteis. Fornece uma referência de opções para pontos de bônus!

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars3.githubusercontent.com/u/31936044" width="100px;" alt="Foto do Iuri Silva no GitHub"/><br>
        <sub>
          <b>Iuri Silva</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://s2.glbimg.com/FUcw2usZfSTL6yCCGj3L3v3SpJ8=/smart/e.glbimg.com/og/ed/f/original/2019/04/25/zuckerberg_podcast.jpg" width="100px;" alt="Foto do Mark Zuckerberg"/><br>
        <sub>
          <b>Mark Zuckerberg</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://miro.medium.com/max/360/0*1SkS3mSorArvY9kS.jpg" width="100px;" alt="Foto do Steve Jobs"/><br>
        <sub>
          <b>Steve Jobs</b>
        </sub>
      </a>
    </td>
  </tr>
</table>


## 😄 Seja um dos contribuidores<br>

Quer fazer parte desse projeto? Clique [AQUI](CONTRIBUTING.md) e leia como contribuir.

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.

[⬆ Voltar ao topo](#nome-do-projeto)<br>