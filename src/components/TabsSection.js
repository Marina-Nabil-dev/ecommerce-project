import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const TabsSection = () => {
  return (
    <div className="my-8 p-4">
      <h2 className="text-center text-2xl text-baby-blue">
        What do you want to do?
      </h2>
      <Tabs>
        <TabList className="flex justify-center my-4">
          <Tab>Buy</Tab>
          <Tab>Sell</Tab>
          <Tab>Explore</Tab>
        </TabList>

        <TabPanel>
          <div className="text-center">
            <img src="/images/buy.png" alt="Buy" className="mx-auto" />
            <h3 className="text-lg my-4">Buy Products</h3>
            <button className="bg-baby-blue text-white px-4 py-2 rounded">
              Shop Now
            </button>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="text-center">
            <img src="/images/sell.png" alt="Sell" className="mx-auto" />
            <h3 className="text-lg my-4">Sell Your Products</h3>
            <button className="bg-baby-blue text-white px-4 py-2 rounded">
              Start Selling
            </button>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="text-center">
            <img src="/images/explore.png" alt="Explore" className="mx-auto" />
            <h3 className="text-lg my-4">Explore New Products</h3>
            <button className="bg-baby-blue text-white px-4 py-2 rounded">
              Explore Now
            </button>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TabsSection;
