"use client"; // bruh

import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Loader } from "@/components/ai-elements/loader";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { Fragment, useState } from "react";

export default function RagChatBot() {
  const [input, setInput] = useState<string>("");
  const { messages, sendMessage, status } = useChat();
  const handlePromptSubmit = (message: PromptInputMessage) => {
    if (!message?.text) return;

    console.log("Submitted message:", message);
    try {
      sendMessage({ text: message.text });
    } catch (error: any) {
    } finally {
      setInput("");
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100vh - 100px)]">
        <div className="flex flex-col h-full">
          <Conversation className="h-[90%]">
            <ConversationContent className="">
              {messages.map((message) => (
                <div key={message.id}>
                  {message.parts.map((part, index) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <Fragment key={`${message.id}-${index}`}>
                            <Message from={message.role}>
                              <MessageContent>
                                <MessageResponse>{part.text}</MessageResponse>
                              </MessageContent>
                            </Message>
                          </Fragment>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              ))}
              {(status === "submitted" || status === "streaming") && <Loader />}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <PromptInput className="mt-4" onSubmit={handlePromptSubmit}>
            <PromptInputBody>
              <PromptInputTextarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </PromptInputBody>
            <div>
              <PromptInputTools></PromptInputTools>
              <PromptInputSubmit />
            </div>
          </PromptInput>
        </div>
      </div>
    </>
  );
}
