import { Field } from 'formik';

interface IProps {
  title: string;
  id: string;
  textarea?: boolean;
  type?: string;
}

const TextArea = ({ title, id, textarea, type }: IProps) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="flex flex-row gap-3 items-center justify-between"
      >
        {title}:
        <Field
          className="bg-gray-100 border border-gray-400 rounded-lg px-3 py-2 w-2/3 flex-1"
          name={id}
          id={id}
          type={type}
          as={textarea ? 'textarea' : ''}
        />
      </label>
    </div>
  );
};

export default TextArea;
