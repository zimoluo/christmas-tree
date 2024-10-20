import { Fragment, ReactNode } from "react";
import Link from "next/link";

const parseCustomSyntax = (text: string): ReactNode[] => {
  const customSyntaxRegex = /~~\{(.*?)\}\{(.*?)\}~~|@@\{(.*?)\}\{(.*?)\}@@/g;
  const elements: ReactNode[] = [];
  let lastIndex = 0;

  let match;
  while ((match = customSyntaxRegex.exec(text)) !== null) {
    if (lastIndex < match.index) {
      elements.push(text.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      elements.push(
        <Link
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          key={`link-${match.index}`}
          className="underline underline-offset-2"
        >
          {match[1]}
        </Link>
      );
    } else if (match[3] && match[4]) {
      elements.push(
        <Link
          href={`mailto:${match[4]}`}
          key={`email-${match.index}`}
          className="underline underline-offset-2"
        >
          {match[3]}
        </Link>
      );
    }

    lastIndex = customSyntaxRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
};

const renderText = (text: string): ReactNode[] => {
  if (!text) {
    return [<span key="empty-line"></span>];
  }

  const inlineRegex = /\\(.)|\*(.*?)\*|_(.*?)_|`(.*?)`|\|(.*?)\|/g;
  const elements: ReactNode[] = [];
  let lastIndex = 0;

  let match;
  while ((match = inlineRegex.exec(text)) !== null) {
    if (lastIndex < match.index) {
      elements.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      elements.push(match[1]);
    } else if (match[2]) {
      elements.push(
        <em key={`italic-${match.index}`}>{renderText(match[2])}</em>
      );
    } else if (match[3]) {
      elements.push(
        <strong key={`bold-${match.index}`}>{renderText(match[3])}</strong>
      );
    } else if (match[4]) {
      elements.push(
        <code key={`code-${match.index}`}>{renderText(match[4])}</code>
      );
    } else if (match[5]) {
      elements.push(
        <mark
          className="bg-pastel bg-opacity-75 py-0.5 px-0.25 -mx-0.25 text-primary"
          key={`mark-${match.index}`}
        >
          {renderText(match[5])}
        </mark>
      );
    }

    lastIndex = inlineRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
};

export const enrichTextContent = (input: string): ReactNode[] => {
  const paragraphs = input.split("\n");
  return paragraphs.map((paragraph, idx) => (
    <Fragment key={`paragraph-${idx}`}>
      {idx !== 0 && <br />}
      {parseParagraph(paragraph)}
    </Fragment>
  ));
};

const parseParagraph = (text: string): ReactNode[] => {
  const nodes = renderText(text);
  return nodes.flatMap((node) =>
    typeof node === "string" ? parseCustomSyntax(node) : node
  );
};

export const restoreDisplayText = (content: string): string => {
  let cleanedContent = content.replace(
    /~~\{(.*?)\}\{(.*?)\}~~|@@\{(.*?)\}\{(.*?)\}@@/g,
    "$1$3"
  );

  cleanedContent = cleanedContent
    .replace(/(?<!\\)\*(.*?)(?<!\\)\*/g, "$1")
    .replace(/(?<!\\)_(.*?)(?<!\\)_/g, "$1")
    .replace(/(?<!\\)`(.*?)(?<!\\)`/g, "$1")
    .replace(/(?<!\\)\|(.*?)(?<!\\)\|/g, "$1");

  cleanedContent = cleanedContent.replace(/\\(.)/g, "$1");

  return cleanedContent;
};
