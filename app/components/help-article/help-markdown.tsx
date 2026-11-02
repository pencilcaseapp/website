import type { Nodes, Parents, Root } from 'mdast';
import { Link } from 'react-router';
import { TextLink } from '~/ui/text-link/text-link';

const LIST = 'mt-6 flex flex-col gap-3 pl-6';

export interface HelpMarkdownProps {
  /** Markdown the server parsed, so no parser ships to the browser. */
  tree: Root;
  /** The classes of its paragraphs. */
  paragraphClassName?: string;
}

/** Draws an answer of the help: paragraphs, lists, bold, code, links. */
export const HelpMarkdown: React.FC<HelpMarkdownProps> = ({
  tree,
  paragraphClassName = 'mt-6',
}) => <Children parent={tree} paragraphClassName={paragraphClassName} />;

interface NodeProps {
  paragraphClassName: string;
  /** Inside a tight list, where a paragraph is only its text. */
  isTight?: boolean;
}

const Children: React.FC<NodeProps & { parent: Parents }> = ({
  parent,
  ...props
}) => parent.children.map((node, index) => (
  <Node key={index} node={node} {...props} />
));

const Node: React.FC<NodeProps & { node: Nodes }> = ({ node, ...props }) => {
  switch (node.type) {
    case 'text':
      return node.value;
    case 'inlineCode':
      return (
        <code className="rounded-md bg-pca-grey-100 px-1.5 py-0.5 font-mono text-[0.9em]">
          {node.value}
        </code>
      );
    case 'paragraph':
      return props.isTight
        ? <Children parent={node} {...props} />
        : (
            <p className={props.paragraphClassName}>
              <Children parent={node} {...props} />
            </p>
          );
    case 'strong':
      return (
        <strong className="font-semibold">
          <Children parent={node} {...props} />
        </strong>
      );
    case 'emphasis':
      return <em><Children parent={node} {...props} /></em>;
    case 'link':
      return node.url.startsWith('/')
        ? (
            <TextLink as={Link} to={node.url}>
              <Children parent={node} {...props} />
            </TextLink>
          )
        : (
            <TextLink href={node.url}>
              <Children parent={node} {...props} />
            </TextLink>
          );
    case 'list': {
      const List = node.ordered ? 'ol' : 'ul';

      return (
        <List
          className={node.ordered
            ? `${LIST} list-decimal marker:font-semibold`
            : `${LIST} list-disc marker:text-pca-grey-500`}
        >
          <Children parent={node} {...props} isTight={!node.spread} />
        </List>
      );
    }
    case 'listItem':
      return <li><Children parent={node} {...props} /></li>;
    default:
      return 'children' in node
        ? <Children parent={node} {...props} />
        : null;
  }
};
