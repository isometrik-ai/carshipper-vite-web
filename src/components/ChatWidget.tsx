import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useChatWidget } from "@/api/chatWidget";
import type { LucideIcon } from "lucide-react";

// Helper to resolve dynamic icons from Lucide
const getIcon = (name: string): LucideIcon => {
  const Icon = (LucideIcons as any)[name];
  return Icon || LucideIcons.HelpCircle;
};

const ChatWidget = () => {
  const { data, isLoading } = useChatWidget();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);

  // Extract chat widget data from API response
  const chatData = data?.data;

  // Initialize messages with welcome message when data is loaded
  useEffect(() => {
    if (chatData && messages.length === 0) {
      setMessages([{ text: chatData.welcome_message, isUser: false }]);
    }
  }, [chatData, messages.length]);

  const handleSend = () => {
    if (!message.trim() || !chatData) return;

    setMessages((prev) => [...prev, { text: message, isUser: true }]);
    setMessage("");

    // Simulate response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: chatData.reply_message, isUser: false },
      ]);
    }, 1000);
  };

  if (isLoading || !chatData) {
    return null; // Don't render widget while loading
  }

  const ModalIcon = getIcon(chatData.modal_icon);
  const CloseIcon = getIcon(chatData.modal_close_icon);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <ModalIcon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground">{chatData.modal_title}</h3>
                  <p className="text-xs text-primary-foreground/70">{chatData.modal_description}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3 bg-muted/30">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${msg.isUser
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-background border border-border rounded-bl-md"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={chatData.input_placehoder}
                  className="flex-1 bg-muted rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  className="rounded-full"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      >
        {isOpen ? (
          <CloseIcon className="w-6 h-6 text-primary-foreground" />
        ) : (
          <ModalIcon className="w-6 h-6 text-primary-foreground" />
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
