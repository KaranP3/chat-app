import { useState } from "react";
import { FormControl, Input, Button } from "@chakra-ui/react";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.config";

const Bottombar = ({ id, user }) => {
  const [input, setInput] = useState();

  const sendMessage = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <FormControl p="3" boxShadow="3xl" onSubmit={sendMessage} as="form">
      <Input
        focusBorderColor="purple.400"
        _placeholder={{ opacity: 0.4, color: "gray.500" }}
        placeholder="type a message..."
        autoComplete="off"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <Button type="submit" hidden onClick={sendMessage}>
        Submit
      </Button>
    </FormControl>
  );
};

export default Bottombar;