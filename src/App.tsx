import { Form } from "../lib/main.ts";

function App() {
  return <Form onSubmit={(str: string) => console.log(str)} />;
}

export default App;
