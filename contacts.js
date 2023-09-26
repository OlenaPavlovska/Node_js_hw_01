import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactPath = path.resolve("db", "contacts.json");
console.log(contactPath);

export const contactsList = async () => {
  return JSON.parse(await fs.readFile(contactPath));
};

export const getContById = async (contactId) => {
  const contacts = await contactsList();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

export const removeContact = async (contactId) => {
  const contacts = await contactsList();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  const [res] = contacts.splice(index, 1);
  await putContact(contacts);
  return res;
};

export const putContact = async (contacts) => {
  return await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
};

export const addContact = async (name, phone, email) => {
  const contacts = await contactsList();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await putContact(contacts);
  return newContact;
};
