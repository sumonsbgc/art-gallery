type TabContentProps = {
  activeTab: string;
  id: string;
  children: React.ReactNode;
};

export const TabContent = ({ activeTab, id, children }: TabContentProps) => {
  return (
    activeTab === id && (
      <div className={`tab-item w-full ${activeTab === id && 'active-tab'}`} id={id}>
        {children}
      </div>
    )
  );
};
