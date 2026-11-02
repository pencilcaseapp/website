import { Link } from 'react-router';
import { HELP_HREF } from '~/constants/links';
import { QUESTIONS } from '~/constants/questions';
import { Accordion } from '~/ui/accordion/accordion';
import { HandArrowDown } from '~/ui/hand-note/hand-note';
import { TextLink } from '~/ui/text-link/text-link';

const ITEMS = QUESTIONS.map(({ id, question, answer }) => ({
  id,
  title: question,
  content: answer,
}));

export interface QuestionsProps {
  className?: string;
}

export const Questions: React.FC<QuestionsProps> = ({ className }) => (
  <div id="questions" className={className}>
    <div className="text-center">
      <h3 className="type-hand-lg inline-block -rotate-2">
        Questions? Answers.
      </h3>
      <HandArrowDown className="mx-auto mt-2" />
    </div>
    <Accordion items={ITEMS} headingLevel="h4" className="mt-6" />
    <p className="type-body-lg mt-8 text-center">
      <TextLink as={Link} to={HELP_HREF} className="font-semibold">
        See all questions
      </TextLink>
    </p>
  </div>
);
