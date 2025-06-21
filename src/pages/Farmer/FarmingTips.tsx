
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Lightbulb, Shield, Droplets, Bug, Leaf, TrendingUp, Users, AlertTriangle } from 'lucide-react';

const FarmingTips = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const tipCategories = {
    'soil': {
      title: 'Soil Management',
      icon: Leaf,
      color: 'bg-green-500',
      tips: [
        {
          title: 'Soil Testing',
          category: '🧪 Testing',
          description: 'Test your soil pH every 6 months. Most crops prefer pH 6-7.5.',
          importance: 'High',
          season: 'All Year',
          difficulty: 'Easy',
          details: 'Use digital pH meters or soil testing kits. Add lime to increase pH or sulfur to decrease pH. Test for NPK levels to determine fertilizer needs.',
        },
        {
          title: 'Organic Matter',
          category: '🌱 Enrichment',
          description: 'Add compost or well-rotted manure to improve soil structure and fertility.',
          importance: 'High',
          season: 'Before Planting',
          difficulty: 'Easy',
          details: 'Apply 2-3 inches of compost annually. Mix thoroughly into top 6 inches of soil. This improves water retention and nutrient availability.',
        },
        {
          title: 'Crop Rotation',
          category: '🔄 Planning',
          description: 'Rotate crops to prevent soil depletion and reduce pest buildup.',
          importance: 'High',
          season: 'Planning Phase',
          difficulty: 'Medium',
          details: 'Follow legumes with heavy feeders like corn. Avoid planting same family crops in succession. Keep rotation records.',
        },
      ]
    },
    'water': {
      title: 'Water Management',
      icon: Droplets,
      color: 'bg-blue-500',
      tips: [
        {
          title: 'Drip Irrigation',
          category: '💧 Efficiency',
          description: 'Install drip irrigation systems to conserve water and reduce disease.',
          importance: 'High',
          season: 'All Year',
          difficulty: 'Medium',
          details: 'Saves 30-50% water compared to flood irrigation. Delivers water directly to roots. Reduces weed growth and fungal diseases.',
        },
        {
          title: 'Mulching',
          category: '🍂 Conservation',
          description: 'Use organic mulch to retain soil moisture and suppress weeds.',
          importance: 'Medium',
          season: 'Growing Season',
          difficulty: 'Easy',
          details: 'Apply 2-4 inches of straw, leaves, or grass clippings around plants. Keep mulch away from plant stems to prevent rot.',
        },
        {
          title: 'Rainwater Harvesting',
          category: '🌧️ Collection',
          description: 'Collect and store rainwater for dry periods.',
          importance: 'Medium',
          season: 'Monsoon Prep',
          difficulty: 'Medium',
          details: 'Install gutters and storage tanks. Use first flush diverters for cleaner water. Cover tanks to prevent mosquito breeding.',
        },
      ]
    },
    'pest': {
      title: 'Pest & Disease Control',
      icon: Shield,
      color: 'bg-red-500',
      tips: [
        {
          title: 'Integrated Pest Management',
          category: '🛡️ Strategy',
          description: 'Combine biological, cultural, and chemical methods for pest control.',
          importance: 'High',
          season: 'All Year',
          difficulty: 'Medium',
          details: 'Monitor pest levels regularly. Use beneficial insects, crop rotation, and resistant varieties. Apply pesticides only when necessary.',
        },
        {
          title: 'Companion Planting',
          category: '🌿 Natural',
          description: 'Plant pest-repelling crops alongside main crops.',
          importance: 'Medium',
          season: 'Planting Time',
          difficulty: 'Easy',
          details: 'Marigolds repel aphids and nematodes. Basil deters tomato hornworms. Neem trees provide natural pesticide.',
        },
        {
          title: 'Early Detection',
          category: '👁️ Monitoring',
          description: 'Regular crop inspection helps catch problems early.',
          importance: 'High',
          season: 'Growing Season',
          difficulty: 'Easy',
          details: 'Check plants weekly for signs of pests or disease. Look under leaves and at growing tips. Keep records of problems and treatments.',
        },
      ]
    },
    'harvest': {
      title: 'Harvesting & Storage',
      icon: TrendingUp,
      color: 'bg-yellow-500',
      tips: [
        {
          title: 'Optimal Timing',
          category: '⏰ Timing',
          description: 'Harvest at the right time for maximum quality and shelf life.',
          importance: 'High',
          season: 'Harvest Time',
          difficulty: 'Medium',
          details: 'Learn maturity indicators for each crop. Harvest in cool morning hours. Use sharp, clean tools to prevent damage.',
        },
        {
          title: 'Post-Harvest Handling',
          category: '📦 Processing',
          description: 'Proper handling reduces losses and maintains quality.',
          importance: 'High',
          season: 'Harvest Time',
          difficulty: 'Medium',
          details: 'Cool products quickly after harvest. Handle gently to avoid bruising. Sort and grade products for better market prices.',
        },
        {
          title: 'Storage Solutions',
          category: '🏪 Preservation',
          description: 'Invest in proper storage to extend product life.',
          importance: 'Medium',
          season: 'Post-Harvest',
          difficulty: 'Medium',
          details: 'Control temperature and humidity. Use proper ventilation. Regularly inspect stored products for spoilage.',
        },
      ]
    },
    'business': {
      title: 'Farm Business',
      icon: Users,
      color: 'bg-purple-500',
      tips: [
        {
          title: 'Record Keeping',
          category: '📊 Management',
          description: 'Maintain detailed records of expenses, yields, and activities.',
          importance: 'High',
          season: 'All Year',
          difficulty: 'Easy',
          details: 'Track input costs, labor hours, and yields per crop. Use mobile apps or simple notebooks. Analyze data to improve profitability.',
        },
        {
          title: 'Market Research',
          category: '📈 Planning',
          description: 'Study market trends and plan crops accordingly.',
          importance: 'High',
          season: 'Planning Phase',
          difficulty: 'Medium',
          details: 'Monitor local market prices. Establish relationships with buyers. Consider value-added processing opportunities.',
        },
        {
          title: 'Diversification',
          category: '🌈 Strategy',
          description: 'Grow multiple crops to spread risk and increase income.',
          importance: 'Medium',
          season: 'Planning Phase',
          difficulty: 'Medium',
          details: 'Combine cash crops with food crops. Consider livestock integration. Explore agritourism opportunities.',
        },
      ]
    },
  };

  const allTips = Object.values(tipCategories).flatMap(category => 
    category.tips.map(tip => ({ ...tip, categoryTitle: category.title }))
  );

  const filteredTips = searchTerm 
    ? allTips.filter(tip => 
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const getImportanceColor = (importance: string) => {
    switch (importance.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'default';
      case 'medium': return 'secondary';
      case 'hard': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-800 mb-2">Farming Tips & Guidance</h1>
        <p className="text-lg text-muted-foreground">
          Expert advice and best practices for successful farming
        </p>
      </div>

      {/* Search */}
      <Card className="mb-8 border-farm-200">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for farming tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          {searchTerm && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-3">
                Found {filteredTips.length} tips matching "{searchTerm}"
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredTips.map((tip, index) => (
                  <TipCard key={index} tip={tip} showCategory />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {!searchTerm && (
        <Tabs defaultValue="soil" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {Object.entries(tipCategories).map(([key, category]) => (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                <category.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(tipCategories).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <div className="mb-6">
                <Card className={`border-2 ${category.color.replace('bg-', 'border-').replace('500', '200')}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl">{category.title}</h2>
                        <p className="text-muted-foreground font-normal">
                          Essential tips for {category.title.toLowerCase()}
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {category.tips.map((tip, index) => (
                  <TipCard key={index} tip={tip} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* Emergency Tips */}
      <Card className="mt-8 border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="h-6 w-6" />
            Emergency Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-red-800">Pest Outbreak</h4>
              <p className="text-sm text-red-700">
                1. Identify the pest correctly<br/>
                2. Remove affected plants immediately<br/>
                3. Apply organic neem oil spray<br/>
                4. Contact local agricultural extension officer
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-red-800">Disease Spread</h4>
              <p className="text-sm text-red-700">
                1. Isolate affected areas<br/>
                2. Improve air circulation<br/>
                3. Reduce overhead watering<br/>
                4. Apply copper-based fungicide if needed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TipCard = ({ tip, showCategory = false }: { tip: any; showCategory?: boolean }) => {
  const getImportanceColor = (importance: string) => {
    switch (importance.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'default';
      case 'medium': return 'secondary';
      case 'hard': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card className="border-farm-200 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              {tip.title}
            </CardTitle>
            {showCategory && (
              <p className="text-sm text-muted-foreground mt-1">{tip.categoryTitle}</p>
            )}
            <p className="text-lg font-normal mt-1">{tip.category}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Badge variant={getImportanceColor(tip.importance)}>
              {tip.importance}
            </Badge>
            <Badge variant={getDifficultyColor(tip.difficulty)}>
              {tip.difficulty}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{tip.description}</p>
        
        <div className="mb-4">
          <Badge variant="outline" className="mb-2">
            📅 {tip.season}
          </Badge>
        </div>

        <div className="bg-farm-50 p-4 rounded-lg">
          <h4 className="font-semibold text-farm-800 mb-2">Detailed Guide:</h4>
          <p className="text-sm text-farm-700">{tip.details}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FarmingTips;
