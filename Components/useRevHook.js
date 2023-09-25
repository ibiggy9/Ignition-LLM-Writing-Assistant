import React, { useEffect, useState } from 'react';
import Purchases from 'react-native-purchases';

const APIKeys = {
  apple: 'appl_UeyiutYwrDOhVXVzqphpowVVXbE',
  google: '',
};

const typesOfMembership = {
  monthly: 'proMonthly',
  yearly: 'proYearly'
};

function useRevHook() {
  const [currentOffering, setCurrentOffering] = useState();
  const [customerInfo, setCustomerInfo] = useState();
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [isProMember, setIsProMember] = useState(false);
  const [currentProduct, setCurrentProduct] = useState()
  const [membershipLevel, setMembershipLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        Purchases.configure({ apiKey: APIKeys.apple });

        const offerings = await Purchases.getOfferings();
        const products = await Purchases.getProducts()
        const customerInfoData = await Purchases.getCustomerInfo();
        
        setCurrentProduct(products.current)
        setCustomerInfo(customerInfoData);
        setCurrentOffering(offerings.current);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const customerInfoUpdated = async (purchaserInfo) => {
      setCustomerInfo(purchaserInfo);
    };
    
    const unsubscribe = Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);
    

    
  }, []);

  useEffect(() => {
    if (customerInfo) {
      setIsSubscriber(customerInfo.activeSubscriptions.includes('pro'));
      setIsProMember(!!customerInfo.entitlements.active.pro);
      setMembershipLevel(customerInfo.entitlements);
    }
  }, [customerInfo]);

  return { currentOffering, customerInfo, isProMember, membershipLevel, loading, error , currentProduct};
}

export default useRevHook;
