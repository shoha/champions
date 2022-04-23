interface Props {
  title: string;
  children: any;
  className: string;
}

export const Section = ({ title, children, className }: Props) => {
  return (
    <div className={className}>
      <h3 className="text-xl uppercase">{title}</h3>
      <hr className="border-t-2 border-gray-400 my-2"></hr>
      {children}
    </div>
  );
};
