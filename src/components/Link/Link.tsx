type Props = {
  link: any;
};

export const Link = (props: Props) => {
  const { link } = props;

  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  );
};
