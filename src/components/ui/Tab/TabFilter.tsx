type TabNavItemProps = {
  title: string;
  activeTab: string;
  activeClass?: string;
  className?: string;
  id: string;
  activeHandler: () => void;
};

export const TabFilterItem = ({
  title,
  activeTab,
  id,
  activeHandler,
  className,
  activeClass
}: TabNavItemProps) => {
  return (
    <li
      className={`filter-item ${className} ${activeTab === id && 'active-filter ' + activeClass}`}
      onClick={activeHandler}
    >
      {title}
    </li>
  );
};
