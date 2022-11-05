import useSocket from "./useSocket";

function App() {
  const s = useSocket();

  if (!s.isConnected) {
    return <p>Connecting...</p>;
  }

  return (
    <>
      <h1>Hello, World!</h1>
      <p>ID: {s.socket.id}</p>
    </>
  );
}
export default App;
