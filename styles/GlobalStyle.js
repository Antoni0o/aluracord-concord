export default function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }

      .chatBox {
        scrollbar-width: thin;
        scrollbar-color: #181f25 #52667a;
      }

      .chatBox::-webkit-scrollbar {
        width: 8px;
      }

      .chatBox::-webkit-scrollbar-track {
        background: #313D49;
        border-radius: 10px;
      }

      .chatBox::-webkit-scrollbar-thumb {
        background-color: #181f25;
        border-radius: 10px;
        border: 0px none #181f25;
      }

      formBox

      .formBox {
        scrollbar-width: thin;
        scrollbar-color: #181f25 #52667a;
      }

      .formBox::-webkit-scrollbar {
        width: 8px;
      }

      .formBox::-webkit-scrollbar-track {
        background: #313D49;
        border-radius: 10px;
        margin: 4px 0;
      }

      .formBox::-webkit-scrollbar-thumb {
        background-color: #212931;
        border-radius: 10px;
        border: 0px none #212931;
      }

      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }

      
      @media(max-width: 1024px) {
        .messageText {
          max-width: 200px;
          word-break: break-word
        }
      }
      /* ./App fit Height */ 
    `}</style>
  );
}