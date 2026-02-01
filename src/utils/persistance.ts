export function setDocument(document: string) {
  localStorage.setItem("livemd.document", document);
}

export function getDocument() {
  return localStorage.getItem("livemd.document") ?? "";
}
