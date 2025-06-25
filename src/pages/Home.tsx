
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Sprout, Users, Truck, Shield, TrendingUp, Heart, ArrowRight, Leaf, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Home = () => {
  const { isAuthenticated, profile } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-farm-600 via-farm-700 to-green-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-farm-100 leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Button asChild size="lg" className="bg-white text-farm-600 hover:bg-farm-50 text-lg px-8 py-3">
                    <Link to="/register">{t('home.hero.getStarted')}</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-farm-600 text-lg px-8 py-3">
                    <Link to="/crops">{t('home.hero.browseCrops')}</Link>
                  </Button>
                </>
              ) : (
                <Button asChild size="lg" className="bg-white text-farm-600 hover:bg-farm-50 text-lg px-8 py-3">
                  <Link to="/crops">
                    {t('home.hero.exploreCrops')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Leaf className="h-16 w-16 text-farm-200 animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <Sprout className="h-20 w-20 text-farm-200 animate-bounce" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-farm-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-farm-800 mb-4">{t('home.features.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-farm-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-farm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sprout className="h-8 w-8 text-farm-600" />
                </div>
                <CardTitle className="text-xl text-farm-800">{t('home.feature.fresh.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  {t('home.feature.fresh.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-farm-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-farm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-farm-600" />
                </div>
                <CardTitle className="text-xl text-farm-800">{t('home.feature.direct.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  {t('home.feature.direct.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-farm-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-farm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-farm-600" />
                </div>
                <CardTitle className="text-xl text-farm-800">{t('home.feature.neighbor.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  {t('home.feature.neighbor.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-farm-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-farm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-farm-600" />
                </div>
                <CardTitle className="text-xl text-farm-800">{t('home.feature.transport.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  {t('home.feature.transport.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-farm-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-farm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-farm-600" />
                </div>
                <CardTitle className="text-xl text-farm-800">{t('home.feature.trusted.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  {t('home.feature.trusted.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-farm-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-farm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-farm-600" />
                </div>
                <CardTitle className="text-xl text-farm-800">{t('home.feature.community.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  {t('home.feature.community.desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-farm-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-farm-200 text-lg">{t('home.stats.farmers')}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-farm-200 text-lg">{t('home.stats.customers')}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-farm-200 text-lg">{t('home.stats.districts')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-farm-50 to-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-farm-800 mb-6">{t('home.cta.title')}</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('home.cta.subtitle')}
          </p>
          
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-farm-600 hover:bg-farm-700 text-lg px-8 py-3">
                <Link to="/register">{t('home.cta.joinFarmer')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-farm-600 text-farm-600 hover:bg-farm-600 hover:text-white text-lg px-8 py-3">
                <Link to="/register">{t('home.cta.joinConsumer')}</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg text-farm-600">{t('home.cta.welcomeBack')} {profile?.name}!</p>
              {profile?.role === 'farmer' ? (
                <Button asChild size="lg" className="bg-farm-600 hover:bg-farm-700 text-lg px-8 py-3">
                  <Link to="/post-crop">{t('home.cta.postCrops')}</Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="bg-farm-600 hover:bg-farm-700 text-lg px-8 py-3">
                  <Link to="/crops">{t('home.cta.browseFreshCrops')}</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
