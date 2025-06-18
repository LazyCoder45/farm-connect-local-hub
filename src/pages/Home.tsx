import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Sprout, Users, MapPin, TrendingUp, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  const { isAuthenticated, profile } = useAuth();

  const features = [
    {
      icon: <Sprout className="h-8 w-8 text-farm-600" />,
      title: "Direct Farm Connection",
      description: "Connect directly with local farmers in your area. No middlemen, fair prices."
    },
    {
      icon: <MapPin className="h-8 w-8 text-farm-600" />,
      title: "Location-Based Discovery",
      description: "Find fresh produce from farmers in your district, upazila, and union."
    },
    {
      icon: <Users className="h-8 w-8 text-farm-600" />,
      title: "Community Marketplace",
      description: "Join a thriving community of farmers and conscious consumers."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-farm-600" />,
      title: "Fair Pricing",
      description: "Government-regulated pricing ensures fair compensation for farmers."
    }
  ];

  const testimonials = [
    {
      name: "Rahman Sheikh",
      role: "Rice Farmer, Dinajpur",
      content: "FarmConnect helped me sell my entire harvest directly to consumers. No more dealing with brokers!",
      rating: 5
    },
    {
      name: "Fatima Begum",
      role: "Consumer, Dhaka",
      content: "I love getting fresh vegetables directly from local farmers. The quality is amazing!",
      rating: 5
    }
  ];

  return (
    <div className="gradient-bg farm-pattern">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-farm-800 mb-6">
            Connect Farms to Families
          </h1>
          <p className="text-xl text-farm-700 mb-8 max-w-3xl mx-auto">
            A revolutionary platform where farmers post their crops before harvest, 
            and consumers buy fresh produce directly from their local community.
          </p>
          
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-farm-600 hover:bg-farm-700">
                <Link to="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-farm-600 text-farm-600">
                <Link to="/crops">Browse Crops</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-farm-800">
                Welcome back, {profile?.name || 'User'}!
              </h2>
              {profile?.role === 'farmer' ? (
                <Button size="lg" asChild className="bg-farm-600 hover:bg-farm-700">
                  <Link to="/post-crop">
                    Post Your Next Crop
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" asChild className="bg-farm-600 hover:bg-farm-700">
                  <Link to="/crops">
                    Browse Fresh Crops
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-farm-800 mb-12">
            How FarmConnect Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-farm-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-farm-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-farm-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-farm-800 mb-2">500+</h3>
              <p className="text-farm-600">Active Farmers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-farm-800 mb-2">2000+</h3>
              <p className="text-farm-600">Happy Consumers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-farm-800 mb-2">50+</h3>
              <p className="text-farm-600">Districts Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-farm-800 mb-12">
            What Our Community Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-harvest-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-farm-700 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <h4 className="font-semibold text-farm-800">{testimonial.name}</h4>
                    <p className="text-sm text-farm-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-farm-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Agriculture?
          </h2>
          <p className="text-xl mb-8 text-farm-100">
            Join thousands of farmers and consumers building a sustainable food system.
          </p>
          {!isAuthenticated && (
            <Button size="lg" asChild className="bg-white text-farm-600 hover:bg-farm-50">
              <Link to="/register">Join FarmConnect Today</Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
