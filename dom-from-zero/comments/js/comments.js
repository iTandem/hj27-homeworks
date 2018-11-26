'use strict';

function showComments(list) {
  document.querySelector('.comments').appendChild(
    commentTemplateEngine(list.map(createCommentTemplate))
  );
}

function createCommentTemplate(comment) {
  return {
    tag: 'div',
    cls: 'comment-wrap',
    content: [
      {
        tag: 'div',
        cls: 'photo',
        attrs: {title: comment.author.name},
        content: {
          tag: 'div',
          cls: 'avatar',
          attrs: {style: `background-image: url('${comment.author.pic}')`}
        }
      },
      {
        tag: 'div',
        cls: 'comment-block',
        content: [
          {
            tag: 'p',
            cls: 'comment-text',
            content: comment.text
          },
          {
            tag: 'div',
            cls: 'bottom-comment',
            content: [
              {
                tag: 'div',
                cls: 'comment-date',
                content: new Date(comment.date).toLocaleString('ru-Ru')
              },
              {
                tag: 'ul',
                cls: 'comment-actions',
                content: [
                  {
                    tag: 'li',
                    cls: 'complain',
                    content: 'Пожаловаться'
                  },
                  {
                    tag: 'li',
                    cls: 'reply',
                    content: 'Ответить'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

function commentTemplateEngine(block) {
  if ((block === undefined) || (block === null) || (block === false)) {
    return document.createTextNode('');
  }
  if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
    const textArray = block.split('\n');
    return textArray.reduce((emptyElement, element) => {
      emptyElement.appendChild(document.createTextNode(element));
      emptyElement.appendChild(document.createElement('br'));
      return emptyElement;
    }, document.createDocumentFragment());
  }
  if (Array.isArray(block)) {
    return block.reduce(function (f, item) {
      f.appendChild(commentTemplateEngine(item));
      return f;
    }, document.createDocumentFragment());
  }

  const element = document.createElement(block.tag);
  element.classList.add(...[].concat(block.cls || []));
  if (block.content) {
    element.appendChild(commentTemplateEngine(block.content));
  }
  if (block.attrs) {
    Object.keys(block.attrs).forEach(key => {
      element.setAttribute(key, block.attrs[key]);
    })
  }
  return element;
}

fetch('https://neto-api.herokuapp.com/comments').then(res => res.json()).then(showComments);