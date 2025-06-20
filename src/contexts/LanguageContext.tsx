
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.crops': 'Crops',
    'nav.orders': 'Orders',
    'nav.transport': 'Transport',
    'nav.topFarmers': 'Top Farmers',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'nav.postCrop': 'Post Crop',
    
    // Home page
    'home.hero.title': 'Connect with Local Farmers',
    'home.hero.subtitle': 'Fresh crops, fair prices, and direct connections between farmers and consumers',
    'home.hero.getStarted': 'Get Started Today',
    'home.hero.browseCrops': 'Browse Crops',
    'home.hero.exploreCrops': 'Explore Fresh Crops',
    'home.features.title': 'Why Choose FarmConnect?',
    'home.features.subtitle': 'We\'re revolutionizing how farmers and consumers connect, creating a sustainable marketplace for everyone',
    'home.feature.fresh.title': 'Fresh & Local',
    'home.feature.fresh.desc': 'Get the freshest produce directly from local farmers in your area, ensuring quality and supporting your community.',
    'home.feature.direct.title': 'Direct Connection',
    'home.feature.direct.desc': 'Connect directly with farmers, eliminate middlemen, and ensure fair prices for both buyers and sellers.',
    'home.feature.neighbor.title': 'Neighbor Crops',
    'home.feature.neighbor.desc': 'Discover fresh produce from farmers in your neighborhood with our location-based crop recommendations.',
    'home.feature.transport.title': 'Easy Transport',
    'home.feature.transport.desc': 'Find reliable transport services to get your crops from farm to table efficiently and safely.',
    'home.feature.trusted.title': 'Trusted Platform',
    'home.feature.trusted.desc': 'Our verified farmer network and customer rating system ensures you\'re dealing with trusted partners.',
    'home.feature.community.title': 'Community First',
    'home.feature.community.desc': 'Support local agriculture, reduce environmental impact, and strengthen community bonds through direct trade.',
    'home.stats.farmers': 'Active Farmers',
    'home.stats.customers': 'Happy Customers',
    'home.stats.districts': 'Districts Covered',
    'home.cta.title': 'Ready to Get Started?',
    'home.cta.subtitle': 'Join thousands of farmers and consumers who are already benefiting from our platform',
    'home.cta.joinFarmer': 'Join as Farmer',
    'home.cta.joinConsumer': 'Join as Consumer',
    'home.cta.welcomeBack': 'Welcome back,',
    'home.cta.postCrops': 'Post Your Crops',
    'home.cta.browseFreshCrops': 'Browse Fresh Crops',
    
    // Auth
    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Sign in to your FarmConnect account',
    'auth.login.email': 'Email',
    'auth.login.password': 'Password',
    'auth.login.signIn': 'Sign In',
    'auth.login.signingIn': 'Signing In...',
    'auth.login.noAccount': 'Don\'t have an account?',
    'auth.login.registerHere': 'Register here',
    'auth.register.title': 'Join FarmConnect',
    'auth.register.subtitle': 'Create your account and start connecting',
    'auth.register.fullName': 'Full Name',
    'auth.register.phone': 'Phone Number',
    'auth.register.role': 'I am a',
    'auth.register.farmer': 'Farmer',
    'auth.register.consumer': 'Consumer',
    'auth.register.district': 'District',
    'auth.register.upazila': 'Upazila',
    'auth.register.union': 'Union',
    'auth.register.createAccount': 'Create Account',
    'auth.register.creatingAccount': 'Creating Account...',
    'auth.register.haveAccount': 'Already have an account?',
    'auth.register.signInHere': 'Sign in here',
    
    // Common
    'common.loading': 'Loading...',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.back': 'Back',
    'common.viewDetails': 'View Details',
    'common.orderNow': 'Order Now',
    'common.organic': 'Organic',
    'common.available': 'Available',
    'common.rating': 'rating',
    'common.until': 'Until',
    'common.language': 'Language',
    
    // Crops
    'crops.title': 'Available Crops',
    'crops.searchPlaceholder': 'Search crops...',
    'crops.allCategories': 'All Categories',
    'crops.allDistricts': 'All Districts',
    'crops.noCropsFound': 'No crops found',
    'crops.adjustFilters': 'Try adjusting your search or filter criteria.',
    'crops.backToCrops': 'Back to Crops',
    'crops.cropsAvailable': 'crops available',
    'crops.quantity': 'Quantity',
    'crops.location': 'Location',
    'crops.harvestDate': 'Harvest Date',
    'crops.availableUntil': 'Available Until',
    'crops.farmerInfo': 'Farmer Information',
    'crops.cropInfo': 'Crop Information',
    'crops.ownCrop': 'This is your crop listing',
    'crops.notFound': 'Crop Not Found',
    
    // Settings
    'settings.title': 'Settings',
    'settings.menu': 'Settings Menu',
    'settings.notifications': 'Notifications',
    'settings.preferences': 'Preferences',
    'settings.privacy': 'Privacy & Security',
    'settings.notificationPrefs': 'Notification Preferences',
    'settings.emailNotifications': 'Email Notifications',
    'settings.emailNotificationsDesc': 'Receive notifications about orders and crop updates via email',
    'settings.smsNotifications': 'SMS Notifications',
    'settings.smsNotificationsDesc': 'Receive important updates via SMS',
    'settings.marketingEmails': 'Marketing Emails',
    'settings.marketingEmailsDesc': 'Receive promotional offers and market insights',
    'settings.generalPreferences': 'General Preferences',
    'settings.currency': 'Currency',
    'settings.timezone': 'Timezone',
    'settings.privacySecurity': 'Privacy & Security',
    'settings.profileVisibility': 'Profile Visibility',
    'settings.profileVisibilityDesc': 'Control who can see your profile information',
    'settings.dataExport': 'Data Export',
    'settings.dataExportDesc': 'Download your account data',
    'settings.deleteAccount': 'Delete Account',
    'settings.deleteAccountDesc': 'Permanently delete your account and data',
    'settings.configure': 'Configure',
    'settings.export': 'Export',
    'settings.delete': 'Delete',
    'settings.saveSettings': 'Save Settings',
    'settings.accessDenied': 'Access Denied',
    'settings.loginRequired': 'Please login to access settings.',
    'settings.updated': 'Settings Updated',
    'settings.updatedDesc': 'Your settings have been saved successfully.',
    'settings.updateFailed': 'Update Failed',
    'settings.updateFailedDesc': 'Failed to update settings. Please try again.',
    
    // Top Farmers
    'topFarmers.title': 'Top Rated Farmers',
    'topFarmers.subtitle': 'Discover the best farmers in your area based on customer ratings',
    'topFarmers.viewCrops': 'View Crops',
    'topFarmers.noRatedFarmers': 'No rated farmers yet',
    'topFarmers.noRatedFarmersDesc': 'Farmers will appear here once they receive ratings from customers.',
    'topFarmers.loading': 'Loading top rated farmers...',
    
    // 404
    'notFound.title': '404',
    'notFound.message': 'Oops! Page not found',
    'notFound.returnHome': 'Return to Home',
  },
  bn: {
    // Navigation
    'nav.home': 'হোম',
    'nav.crops': 'ফসল',
    'nav.orders': 'অর্ডার',
    'nav.transport': 'পরিবহন',
    'nav.topFarmers': 'শীর্ষ কৃষক',
    'nav.profile': 'প্রোফাইল',
    'nav.settings': 'সেটিংস',
    'nav.login': 'লগইন',
    'nav.register': 'নিবন্ধন',
    'nav.logout': 'লগআউট',
    'nav.postCrop': 'ফসল পোস্ট',
    
    // Home page
    'home.hero.title': 'স্থানীয় কৃষকদের সাথে সংযুক্ত হন',
    'home.hero.subtitle': 'তাজা ফসল, ন্যায্য দাম, এবং কৃষক ও ভোক্তাদের মধ্যে সরাসরি সংযোগ',
    'home.hero.getStarted': 'আজই শুরু করুন',
    'home.hero.browseCrops': 'ফসল ব্রাউজ করুন',
    'home.hero.exploreCrops': 'তাজা ফসল এক্সপ্লোর করুন',
    'home.features.title': 'কেন ফার্মকানেক্ট বেছে নেবেন?',
    'home.features.subtitle': 'আমরা কৃষক ও ভোক্তাদের সংযোগ স্থাপনে বিপ্লব আনছি, সবার জন্য একটি টেকসই বাজার তৈরি করে',
    'home.feature.fresh.title': 'তাজা ও স্থানীয়',
    'home.feature.fresh.desc': 'আপনার এলাকার স্থানীয় কৃষকদের কাছ থেকে সবচেয়ে তাজা পণ্য পান, গুণমান নিশ্চিত করুন এবং আপনার সম্প্রদায়কে সমর্থন করুন।',
    'home.feature.direct.title': 'সরাসরি সংযোগ',
    'home.feature.direct.desc': 'কৃষকদের সাথে সরাসরি সংযোগ স্থাপন করুন, মধ্যস্বত্বভোগীদের বাদ দিন, এবং ক্রেতা ও বিক্রেতা উভয়ের জন্য ন্যায্য দাম নিশ্চিত করুন।',
    'home.feature.neighbor.title': 'প্রতিবেশী ফসল',
    'home.feature.neighbor.desc': 'আমাদের অবস্থান-ভিত্তিক ফসল সুপারিশের মাধ্যমে আপনার পাড়ার কৃষকদের কাছ থেকে তাজা পণ্য আবিষ্কার করুন।',
    'home.feature.transport.title': 'সহজ পরিবহন',
    'home.feature.transport.desc': 'আপনার ফসলকে খামার থেকে টেবিলে দক্ষতার সাথে এবং নিরাপদে পৌঁছাতে নির্ভরযোগ্য পরিবহন সেবা খুঁজুন।',
    'home.feature.trusted.title': 'বিশ্বস্ত প্ল্যাটফর্ম',
    'home.feature.trusted.desc': 'আমাদের যাচাইকৃত কৃষক নেটওয়ার্ক এবং গ্রাহক রেটিং সিস্টেম নিশ্চিত করে যে আপনি বিশ্বস্ত অংশীদারদের সাথে কাজ করছেন।',
    'home.feature.community.title': 'সম্প্রদায় প্রথম',
    'home.feature.community.desc': 'স্থানীয় কৃষিকে সমর্থন করুন, পরিবেশগত প্রভাব কমান, এবং সরাসরি বাণিজ্যের মাধ্যমে সম্প্রদায়িক বন্ধন শক্তিশালী করুন।',
    'home.stats.farmers': 'সক্রিয় কৃষক',
    'home.stats.customers': 'সন্তুষ্ট গ্রাহক',
    'home.stats.districts': 'জেলা কভারেজ',
    'home.cta.title': 'শুরু করার জন্য প্রস্তুত?',
    'home.cta.subtitle': 'হাজার হাজার কৃষক ও ভোক্তার সাথে যোগ দিন যারা ইতিমধ্যে আমাদের প্ল্যাটফর্ম থেকে উপকৃত হচ্ছেন',
    'home.cta.joinFarmer': 'কৃষক হিসেবে যোগদান',
    'home.cta.joinConsumer': 'ভোক্তা হিসেবে যোগদান',
    'home.cta.welcomeBack': 'স্বাগতম,',
    'home.cta.postCrops': 'আপনার ফসল পোস্ট করুন',
    'home.cta.browseFreshCrops': 'তাজা ফসল ব্রাউজ করুন',
    
    // Auth
    'auth.login.title': 'স্বাগতম',
    'auth.login.subtitle': 'আপনার ফার্মকানেক্ট অ্যাকাউন্টে সাইন ইন করুন',
    'auth.login.email': 'ইমেইল',
    'auth.login.password': 'পাসওয়ার্ড',
    'auth.login.signIn': 'সাইন ইন',
    'auth.login.signingIn': 'সাইন ইন হচ্ছে...',
    'auth.login.noAccount': 'অ্যাকাউন্ট নেই?',
    'auth.login.registerHere': 'এখানে নিবন্ধন করুন',
    'auth.register.title': 'ফার্মকানেক্টে যোগদান',
    'auth.register.subtitle': 'আপনার অ্যাকাউন্ট তৈরি করুন এবং সংযোগ শুরু করুন',
    'auth.register.fullName': 'পূর্ণ নাম',
    'auth.register.phone': 'ফোন নম্বর',
    'auth.register.role': 'আমি একজন',
    'auth.register.farmer': 'কৃষক',
    'auth.register.consumer': 'ভোক্তা',
    'auth.register.district': 'জেলা',
    'auth.register.upazila': 'উপজেলা',
    'auth.register.union': 'ইউনিয়ন',
    'auth.register.createAccount': 'অ্যাকাউন্ট তৈরি করুন',
    'auth.register.creatingAccount': 'অ্যাকাউন্ট তৈরি হচ্ছে...',
    'auth.register.haveAccount': 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    'auth.register.signInHere': 'এখানে সাইন ইন করুন',
    
    // Common
    'common.loading': 'লোড হচ্ছে...',
    'common.search': 'খোঁজ',
    'common.filter': 'ফিল্টার',
    'common.save': 'সংরক্ষণ',
    'common.cancel': 'বাতিল',
    'common.back': 'পিছনে',
    'common.viewDetails': 'বিস্তারিত দেখুন',
    'common.orderNow': 'এখনই অর্ডার',
    'common.organic': 'জৈব',
    'common.available': 'উপলব্ধ',
    'common.rating': 'রেটিং',
    'common.until': 'পর্যন্ত',
    'common.language': 'ভাষা',
    
    // Crops
    'crops.title': 'উপলব্ধ ফসল',
    'crops.searchPlaceholder': 'ফসল খুঁজুন...',
    'crops.allCategories': 'সব ক্যাটেগরি',
    'crops.allDistricts': 'সব জেলা',
    'crops.noCropsFound': 'কোনো ফসল পাওয়া যায়নি',
    'crops.adjustFilters': 'আপনার অনুসন্ধান বা ফিল্টার মানদণ্ড সামঞ্জস্য করার চেষ্টা করুন।',
    'crops.backToCrops': 'ফসলে ফিরে যান',
    'crops.cropsAvailable': 'ফসল উপলব্ধ',
    'crops.quantity': 'পরিমাণ',
    'crops.location': 'অবস্থান',
    'crops.harvestDate': 'ফসল কাটার তারিখ',
    'crops.availableUntil': 'উপলব্ধ পর্যন্ত',
    'crops.farmerInfo': 'কৃষকের তথ্য',
    'crops.cropInfo': 'ফসলের তথ্য',
    'crops.ownCrop': 'এটি আপনার ফসলের তালিকা',
    'crops.notFound': 'ফসল পাওয়া যায়নি',
    
    // Settings
    'settings.title': 'সেটিংস',
    'settings.menu': 'সেটিংস মেনু',
    'settings.notifications': 'বিজ্ঞপ্তি',
    'settings.preferences': 'পছন্দসমূহ',
    'settings.privacy': 'গোপনীয়তা ও নিরাপত্তা',
    'settings.notificationPrefs': 'বিজ্ঞপ্তি পছন্দসমূহ',
    'settings.emailNotifications': 'ইমেইল বিজ্ঞপ্তি',
    'settings.emailNotificationsDesc': 'অর্ডার এবং ফসলের আপডেট সম্পর্কে ইমেইলের মাধ্যমে বিজ্ঞপ্তি পান',
    'settings.smsNotifications': 'এসএমএস বিজ্ঞপ্তি',
    'settings.smsNotificationsDesc': 'এসএমএসের মাধ্যমে গুরুত্বপূর্ণ আপডেট পান',
    'settings.marketingEmails': 'মার্কেটিং ইমেইল',
    'settings.marketingEmailsDesc': 'প্রচারমূলক অফার এবং বাজার অন্তর্দৃষ্টি পান',
    'settings.generalPreferences': 'সাধারণ পছন্দসমূহ',
    'settings.currency': 'মুদ্রা',
    'settings.timezone': 'সময়ের অঞ্চল',
    'settings.privacySecurity': 'গোপনীয়তা ও নিরাপত্তা',
    'settings.profileVisibility': 'প্রোফাইল দৃশ্যমানতা',
    'settings.profileVisibilityDesc': 'কে আপনার প্রোফাইল তথ্য দেখতে পারবে তা নিয়ন্ত্রণ করুন',
    'settings.dataExport': 'ডেটা রপ্তানি',
    'settings.dataExportDesc': 'আপনার অ্যাকাউন্ট ডেটা ডাউনলোড করুন',
    'settings.deleteAccount': 'অ্যাকাউন্ট মুছুন',
    'settings.deleteAccountDesc': 'স্থায়ীভাবে আপনার অ্যাকাউন্ট এবং ডেটা মুছে ফেলুন',
    'settings.configure': 'কনফিগার',
    'settings.export': 'রপ্তানি',
    'settings.delete': 'মুছুন',
    'settings.saveSettings': 'সেটিংস সংরক্ষণ',
    'settings.accessDenied': 'অ্যাক্সেস অস্বীকৃত',
    'settings.loginRequired': 'সেটিংস অ্যাক্সেস করতে লগইন করুন।',
    'settings.updated': 'সেটিংস আপডেট হয়েছে',
    'settings.updatedDesc': 'আপনার সেটিংস সফলভাবে সংরক্ষিত হয়েছে।',
    'settings.updateFailed': 'আপডেট ব্যর্থ',
    'settings.updateFailedDesc': 'সেটিংস আপডেট করতে ব্যর্থ। আবার চেষ্টা করুন।',
    
    // Top Farmers
    'topFarmers.title': 'শীর্ষ রেটিং কৃষক',
    'topFarmers.subtitle': 'গ্রাহক রেটিংয়ের ভিত্তিতে আপনার এলাকার সেরা কৃষকদের আবিষ্কার করুন',
    'topFarmers.viewCrops': 'ফসল দেখুন',
    'topFarmers.noRatedFarmers': 'এখনো রেটিং করা কৃষক নেই',
    'topFarmers.noRatedFarmersDesc': 'গ্রাহকদের কাছ থেকে রেটিং পেলে কৃষকরা এখানে দেখা যাবে।',
    'topFarmers.loading': 'শীর্ষ রেটিং কৃষক লোড হচ্ছে...',
    
    // 404
    'notFound.title': '৪০৪',
    'notFound.message': 'দুঃখিত! পৃষ্ঠা পাওয়া যায়নি',
    'notFound.returnHome': 'হোমে ফিরে যান',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('farmconnect-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('farmconnect-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
