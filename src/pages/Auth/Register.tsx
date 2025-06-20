
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sprout } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'farmer' as 'farmer' | 'consumer',
    district: '',
    upazila: '',
    union: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const districts = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'];
  const upazilas = ['Dhanmondi', 'Gulshan', 'Wari', 'Tejgaon', 'Ramna', 'Motijheel'];
  const unions = ['Ward-1', 'Ward-2', 'Ward-3', 'Ward-4', 'Ward-5', 'Ward-6'];

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that all required fields are filled
    if (!formData.name || !formData.email || !formData.password || !formData.phone || 
        !formData.role || !formData.district || !formData.upazila || !formData.union) {
      return;
    }

    setIsLoading(true);

    try {
      await register(formData);
      // Don't navigate here - let the auth state change handle it
    } catch (error) {
      // Error handling is done in the AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg farm-pattern py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1" />
            <Sprout className="h-12 w-12 text-farm-600" />
            <div className="flex-1 flex justify-end">
              <LanguageSelector />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-farm-800">{t('auth.register.title')}</CardTitle>
          <CardDescription>
            {t('auth.register.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('auth.register.fullName')}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={t('auth.register.fullName')}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.login.email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={t('auth.login.email')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.login.password')}</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder={t('auth.login.password')}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">{t('auth.register.phone')}</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+880123456789"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">{t('auth.register.role')}</Label>
              <Select value={formData.role} onValueChange={(value: 'farmer' | 'consumer') => handleInputChange('role', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('auth.register.role')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">{t('auth.register.farmer')}</SelectItem>
                  <SelectItem value="consumer">{t('auth.register.consumer')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="district">{t('auth.register.district')}</Label>
              <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('auth.register.district')} />
                </SelectTrigger>
                <SelectContent>
                  {districts.map(district => (
                    <SelectItem key={district} value={district}>{district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="upazila">{t('auth.register.upazila')}</Label>
              <Select value={formData.upazila} onValueChange={(value) => handleInputChange('upazila', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('auth.register.upazila')} />
                </SelectTrigger>
                <SelectContent>
                  {upazilas.map(upazila => (
                    <SelectItem key={upazila} value={upazila}>{upazila}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="union">{t('auth.register.union')}</Label>
              <Select value={formData.union} onValueChange={(value) => handleInputChange('union', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('auth.register.union')} />
                </SelectTrigger>
                <SelectContent>
                  {unions.map(union => (
                    <SelectItem key={union} value={union}>{union}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-farm-600 hover:bg-farm-700"
              disabled={isLoading}
            >
              {isLoading ? t('auth.register.creatingAccount') : t('auth.register.createAccount')}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t('auth.register.haveAccount')}{' '}
              <Link to="/login" className="text-farm-600 hover:text-farm-700 font-medium">
                {t('auth.register.signInHere')}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
