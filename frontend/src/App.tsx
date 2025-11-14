import { useState, type ChangeEvent } from "react";
import type { FC, JSX } from "react";
import {
  Camera,
  Upload,
  Search,
  DollarSign,
  Info,
  AlertCircle,
  CheckCircle,
  TrendingDown,
  Pill,
  Shield,
} from "lucide-react";
import Header from "./components/ui/common/Header";

// Types
type Composition = {
  ingredient: string;
  strength: string;
  unit: string;
};

type Medicine = {
  id: number;
  brand_name: string;
  generic_name: string;
  composition: Composition[];
  composition_hash: string;
  manufacturer: string;
  price: number;
  form: string;
  pack_size: number;
  uses: string[];
  side_effects: string[];
  prescription_required: boolean;
  what_it_does: string;
  contraindications: string[];
  drug_interactions: string[];
  dosage: string;
  storage: string;
  price_sources: PriceSource[];
};

type PriceSource = {
  platform: string;
  price: number;
  url: string;
  availability: "In Stock" | "Out of Stock" | "Limited Stock";
};

type MedicineDatabase = {
  medicines: Medicine[];
};

type Alternatives = {
  exact: Medicine[];
  sameIngredients: Medicine[];
  similar: Medicine[];
};

type Savings = {
  amount: number;
  percentage: string;
};

// Sample Indian medicines database
const medicineDatabase: MedicineDatabase = {
  medicines: [
    {
      id: 1,
      brand_name: "Crocin 650",
      generic_name: "Paracetamol",
      composition: [{ ingredient: "Paracetamol", strength: "650", unit: "mg" }],
      composition_hash: "paracetamol_650mg",
      manufacturer: "GSK",
      price: 25,
      form: "Tablet",
      pack_size: 15,
      uses: ["Fever", "Headache", "Body pain", "Cold symptoms"],
      side_effects: [
        "Nausea",
        "Allergic reactions (rare)",
        "Liver damage (overdose)",
        "Skin rash",
      ],
      prescription_required: false,
      what_it_does:
        "Paracetamol works by blocking the production of prostaglandins in the brain, which are chemicals that cause pain and fever. It reduces body temperature during fever and provides relief from mild to moderate pain.",
      contraindications: [
        "Severe liver disease",
        "Allergy to paracetamol",
        "Chronic alcoholism",
      ],
      drug_interactions: [
        "Warfarin (blood thinner)",
        "Carbamazepine",
        "Phenytoin",
        "Alcohol",
      ],
      dosage: "Adults: 1-2 tablets every 4-6 hours. Maximum 4g per day.",
      storage: "Store below 25°C in a dry place",
      price_sources: [
        {
          platform: "1mg",
          price: 24.5,
          url: "https://1mg.com",
          availability: "In Stock",
        },
        {
          platform: "PharmEasy",
          price: 26.0,
          url: "https://pharmeasy.in",
          availability: "In Stock",
        },
        {
          platform: "Netmeds",
          price: 25.5,
          url: "https://netmeds.com",
          availability: "Limited Stock",
        },
      ],
    },
    {
      id: 2,
      brand_name: "Dolo 650",
      generic_name: "Paracetamol",
      composition: [{ ingredient: "Paracetamol", strength: "650", unit: "mg" }],
      composition_hash: "paracetamol_650mg",
      manufacturer: "Micro Labs",
      price: 30,
      form: "Tablet",
      pack_size: 15,
      uses: ["Fever", "Headache", "Body pain", "Cold symptoms"],
      side_effects: [
        "Nausea",
        "Allergic reactions (rare)",
        "Liver damage (overdose)",
      ],
      prescription_required: false,
      what_it_does:
        "Paracetamol works by blocking the production of prostaglandins in the brain, which are chemicals that cause pain and fever. It reduces body temperature during fever and provides relief from mild to moderate pain.",
      contraindications: [
        "Severe liver disease",
        "Allergy to paracetamol",
        "Chronic alcoholism",
      ],
      drug_interactions: [
        "Warfarin (blood thinner)",
        "Carbamazepine",
        "Phenytoin",
        "Alcohol",
      ],
      dosage: "Adults: 1-2 tablets every 4-6 hours. Maximum 4g per day.",
      storage: "Store below 25°C in a dry place",
      price_sources: [
        {
          platform: "1mg",
          price: 29.0,
          url: "https://1mg.com",
          availability: "In Stock",
        },
        {
          platform: "PharmEasy",
          price: 31.0,
          url: "https://pharmeasy.in",
          availability: "In Stock",
        },
        {
          platform: "Netmeds",
          price: 30.5,
          url: "https://netmeds.com",
          availability: "In Stock",
        },
      ],
    },
    {
      id: 3,
      brand_name: "Calpol 650",
      generic_name: "Paracetamol",
      composition: [{ ingredient: "Paracetamol", strength: "650", unit: "mg" }],
      composition_hash: "paracetamol_650mg",
      manufacturer: "GSK",
      price: 28,
      form: "Tablet",
      pack_size: 15,
      uses: ["Fever", "Headache", "Body pain", "Cold symptoms"],
      side_effects: [
        "Nausea",
        "Allergic reactions (rare)",
        "Liver damage (overdose)",
      ],
      prescription_required: false,
      what_it_does:
        "Paracetamol works by blocking the production of prostaglandins in the brain, which are chemicals that cause pain and fever. It reduces body temperature during fever and provides relief from mild to moderate pain.",
      contraindications: [
        "Severe liver disease",
        "Allergy to paracetamol",
        "Chronic alcoholism",
      ],
      drug_interactions: [
        "Warfarin (blood thinner)",
        "Carbamazepine",
        "Phenytoin",
        "Alcohol",
      ],
      dosage: "Adults: 1-2 tablets every 4-6 hours. Maximum 4g per day.",
      storage: "Store below 25°C in a dry place",
      price_sources: [
        {
          platform: "1mg",
          price: 27.0,
          url: "https://1mg.com",
          availability: "In Stock",
        },
        {
          platform: "PharmEasy",
          price: 29.0,
          url: "https://pharmeasy.in",
          availability: "In Stock",
        },
        {
          platform: "Netmeds",
          price: 28.5,
          url: "https://netmeds.com",
          availability: "In Stock",
        },
      ],
    },
    {
      id: 4,
      brand_name: "Paracetamol 650 (Generic)",
      generic_name: "Paracetamol",
      composition: [{ ingredient: "Paracetamol", strength: "650", unit: "mg" }],
      composition_hash: "paracetamol_650mg",
      manufacturer: "Various",
      price: 10,
      form: "Tablet",
      pack_size: 15,
      uses: ["Fever", "Headache", "Body pain", "Cold symptoms"],
      side_effects: [
        "Nausea",
        "Allergic reactions (rare)",
        "Liver damage (overdose)",
      ],
      prescription_required: false,
      what_it_does:
        "Paracetamol works by blocking the production of prostaglandins in the brain, which are chemicals that cause pain and fever. It reduces body temperature during fever and provides relief from mild to moderate pain.",
      contraindications: [
        "Severe liver disease",
        "Allergy to paracetamol",
        "Chronic alcoholism",
      ],
      drug_interactions: [
        "Warfarin (blood thinner)",
        "Carbamazepine",
        "Phenytoin",
        "Alcohol",
      ],
      dosage: "Adults: 1-2 tablets every 4-6 hours. Maximum 4g per day.",
      storage: "Store below 25°C in a dry place",
      price_sources: [
        {
          platform: "1mg",
          price: 9.5,
          url: "https://1mg.com",
          availability: "In Stock",
        },
        {
          platform: "PharmEasy",
          price: 10.5,
          url: "https://pharmeasy.in",
          availability: "In Stock",
        },
        {
          platform: "Netmeds",
          price: 10.0,
          url: "https://netmeds.com",
          availability: "In Stock",
        },
      ],
    },
    {
      id: 5,
      brand_name: "Combiflam",
      generic_name: "Ibuprofen + Paracetamol",
      composition: [
        { ingredient: "Ibuprofen", strength: "400", unit: "mg" },
        { ingredient: "Paracetamol", strength: "325", unit: "mg" },
      ],
      composition_hash: "ibuprofen_400mg+paracetamol_325mg",
      manufacturer: "Sanofi",
      price: 28,
      form: "Tablet",
      pack_size: 20,
      uses: [
        "Pain relief",
        "Inflammation",
        "Fever",
        "Muscle pain",
        "Dental pain",
      ],
      side_effects: [
        "Stomach upset",
        "Dizziness",
        "Nausea",
        "Heartburn",
        "Allergic reactions",
      ],
      prescription_required: false,
      what_it_does:
        "Combiflam combines two pain relievers - Ibuprofen (an NSAID that reduces inflammation) and Paracetamol (that blocks pain signals). Together they provide faster and more effective pain relief and fever reduction than either drug alone.",
      contraindications: [
        "Active peptic ulcer",
        "Severe heart failure",
        "Severe kidney disease",
        "Third trimester of pregnancy",
      ],
      drug_interactions: [
        "Aspirin",
        "Blood thinners (Warfarin)",
        "Lithium",
        "Methotrexate",
        "ACE inhibitors",
      ],
      dosage:
        "Adults: 1 tablet every 6-8 hours. Do not exceed 3 tablets in 24 hours.",
      storage: "Store in a cool, dry place away from sunlight",
      price_sources: [
        {
          platform: "1mg",
          price: 27.5,
          url: "https://1mg.com",
          availability: "In Stock",
        },
        {
          platform: "PharmEasy",
          price: 29.5,
          url: "https://pharmeasy.in",
          availability: "In Stock",
        },
        {
          platform: "Netmeds",
          price: 28.0,
          url: "https://netmeds.com",
          availability: "Limited Stock",
        },
      ],
    },
    {
      id: 6,
      brand_name: "Brufen Plus",
      generic_name: "Ibuprofen + Paracetamol",
      composition: [
        { ingredient: "Ibuprofen", strength: "400", unit: "mg" },
        { ingredient: "Paracetamol", strength: "325", unit: "mg" },
      ],
      composition_hash: "ibuprofen_400mg+paracetamol_325mg",
      manufacturer: "Abbott",
      price: 32,
      form: "Tablet",
      pack_size: 20,
      uses: [
        "Pain relief",
        "Inflammation",
        "Fever",
        "Muscle pain",
        "Arthritis pain",
      ],
      side_effects: ["Stomach upset", "Dizziness", "Nausea", "Heartburn"],
      prescription_required: false,
      what_it_does:
        "Brufen Plus combines two pain relievers - Ibuprofen (an NSAID that reduces inflammation) and Paracetamol (that blocks pain signals). Together they provide faster and more effective pain relief and fever reduction than either drug alone.",
      contraindications: [
        "Active peptic ulcer",
        "Severe heart failure",
        "Severe kidney disease",
        "Third trimester of pregnancy",
      ],
      drug_interactions: [
        "Aspirin",
        "Blood thinners (Warfarin)",
        "Lithium",
        "Methotrexate",
        "ACE inhibitors",
      ],
      dosage:
        "Adults: 1 tablet every 6-8 hours. Do not exceed 3 tablets in 24 hours.",
      storage: "Store in a cool, dry place away from sunlight",
      price_sources: [
        {
          platform: "1mg",
          price: 31.0,
          url: "https://1mg.com",
          availability: "In Stock",
        },
        {
          platform: "PharmEasy",
          price: 33.0,
          url: "https://pharmeasy.in",
          availability: "In Stock",
        },
        {
          platform: "Netmeds",
          price: 32.5,
          url: "https://netmeds.com",
          availability: "In Stock",
        },
      ],
    },
    {
      id: 7,
      brand_name: "Saridon",
      generic_name: "Paracetamol + Propyphenazone + Caffeine",
      composition: [
        { ingredient: "Paracetamol", strength: "325", unit: "mg" },
        { ingredient: "Propyphenazone", strength: "150", unit: "mg" },
        { ingredient: "Caffeine", strength: "50", unit: "mg" },
      ],
      composition_hash: "caffeine_50mg+paracetamol_325mg+propyphenazone_150mg",
      manufacturer: "Bayer",
      price: 35,
      form: "Tablet",
      pack_size: 20,
      uses: ["Headache", "Migraine", "Pain", "Toothache", "Period pain"],
      side_effects: [
        "Restlessness",
        "Nausea",
        "Insomnia",
        "Allergic reactions",
      ],
      prescription_required: false,
      what_it_does:
        "Saridon is a triple-action pain reliever. Paracetamol reduces pain and fever, Propyphenazone provides anti-inflammatory action, and Caffeine enhances the effectiveness of pain relief while also helping with alertness.",
      contraindications: [
        "Severe liver disease",
        "Anxiety disorders",
        "High blood pressure",
        "Heart rhythm disorders",
      ],
      drug_interactions: [
        "Other caffeine products",
        "Blood thinners",
        "Antidepressants",
        "Beta-blockers",
      ],
      dosage:
        "Adults: 1-2 tablets with water. Can be repeated after 4-6 hours if needed. Maximum 6 tablets per day.",
      storage: "Store below 30°C in a dry place",
      price_sources: [
        {
          platform: "1mg",
          price: 34.0,
          url: "https://1mg.com",
          availability: "In Stock",
        },
        {
          platform: "PharmEasy",
          price: 36.0,
          url: "https://pharmeasy.in",
          availability: "In Stock",
        },
        {
          platform: "Netmeds",
          price: 35.5,
          url: "https://netmeds.com",
          availability: "In Stock",
        },
      ],
    },
    {
      id: 8,
      brand_name: "Augmentin 625",
      generic_name: "Amoxicillin + Clavulanic Acid",
      composition: [
        { ingredient: "Amoxicillin", strength: "500", unit: "mg" },
        { ingredient: "Clavulanic Acid", strength: "125", unit: "mg" },
      ],
      composition_hash: "amoxicillin_500mg+clavulanic acid_125mg",
      manufacturer: "GSK",
      price: 180,
      form: "Tablet",
      pack_size: 10,
      uses: [
        "Bacterial infections",
        "Respiratory infections",
        "Urinary tract infections",
        "Skin infections",
      ],
      side_effects: [
        "Diarrhea",
        "Nausea",
        "Skin rash",
        "Vomiting",
        "Abdominal pain",
      ],
      prescription_required: true,
      what_it_does:
        "Augmentin is a combination antibiotic that kills bacteria. Amoxicillin stops bacteria from building their cell walls, while Clavulanic acid prevents bacteria from destroying the antibiotic. Together they treat a wide range of bacterial infections.",
      contraindications: [
        "Allergy to penicillin or cephalosporin antibiotics",
        "History of liver problems with this medicine",
        "Mononucleosis",
      ],
      drug_interactions: [
        "Allopurinol",
        "Oral contraceptives",
        "Warfarin",
        "Probenecid",
        "Methotrexate",
      ],
      dosage:
        "Adults: 1 tablet twice or thrice daily for 5-7 days. Take with food.",
      storage: "Store in a cool, dry place below 25°C",
      price_sources: [
        {
          platform: "1mg",
          price: 175.0,
          url: "https://1mg.com",
          availability: "In Stock",
        },
        {
          platform: "PharmEasy",
          price: 182.0,
          url: "https://pharmeasy.in",
          availability: "In Stock",
        },
        {
          platform: "Netmeds",
          price: 178.5,
          url: "https://netmeds.com",
          availability: "Limited Stock",
        },
      ],
    },
    {
      id: 9,
      brand_name: "Clavam 625",
      generic_name: "Amoxicillin + Clavulanic Acid",
      composition: [
        { ingredient: "Amoxicillin", strength: "500", unit: "mg" },
        { ingredient: "Clavulanic Acid", strength: "125", unit: "mg" },
      ],
      composition_hash: "amoxicillin_500mg+clavulanic acid_125mg",
      manufacturer: "Alkem",
      price: 145,
      form: "Tablet",
      pack_size: 10,
      uses: [
        "Bacterial infections",
        "Respiratory infections",
        "Urinary tract infections",
        "Skin infections",
      ],
      side_effects: [
        "Diarrhea",
        "Nausea",
        "Skin rash",
        "Vomiting",
        "Abdominal pain",
      ],
      prescription_required: true,
      what_it_does:
        "Clavam is a combination antibiotic that kills bacteria. Amoxicillin stops bacteria from building their cell walls, while Clavulanic acid prevents bacteria from destroying the antibiotic. Together they treat a wide range of bacterial infections.",
      contraindications: [
        "Allergy to penicillin or cephalosporin antibiotics",
        "History of liver problems with this medicine",
        "Mononucleosis",
      ],
      drug_interactions: [
        "Allopurinol",
        "Oral contraceptives",
        "Warfarin",
        "Probenecid",
        "Methotrexate",
      ],
      dosage:
        "Adults: 1 tablet twice or thrice daily for 5-7 days. Take with food.",
      storage: "Store in a cool, dry place below 25°C",
      price_sources: [
        {
          platform: "1mg",
          price: 142.0,
          url: "https://1mg.com",
          availability: "In Stock",
        },
        {
          platform: "PharmEasy",
          price: 147.0,
          url: "https://pharmeasy.in",
          availability: "In Stock",
        },
        {
          platform: "Netmeds",
          price: 145.5,
          url: "https://netmeds.com",
          availability: "In Stock",
        },
      ],
    },
    {
      id: 10,
      brand_name: "Moxikind CV 625",
      generic_name: "Amoxicillin + Clavulanic Acid",
      composition: [
        { ingredient: "Amoxicillin", strength: "500", unit: "mg" },
        { ingredient: "Clavulanic Acid", strength: "125", unit: "mg" },
      ],
      composition_hash: "amoxicillin_500mg+clavulanic acid_125mg",
      manufacturer: "Mankind",
      price: 135,
      form: "Tablet",
      pack_size: 10,
      uses: [
        "Bacterial infections",
        "Respiratory infections",
        "Urinary tract infections",
        "Skin infections",
      ],
      side_effects: [
        "Diarrhea",
        "Nausea",
        "Skin rash",
        "Vomiting",
        "Stomach pain",
      ],
      prescription_required: true,
      what_it_does:
        "Moxikind CV is a combination antibiotic that kills bacteria. Amoxicillin stops bacteria from building their cell walls, while Clavulanic acid prevents bacteria from destroying the antibiotic. Together they treat a wide range of bacterial infections.",
      contraindications: [
        "Allergy to penicillin or cephalosporin antibiotics",
        "History of liver problems with this medicine",
        "Mononucleosis",
      ],
      drug_interactions: [
        "Allopurinol",
        "Oral contraceptives",
        "Warfarin",
        "Probenecid",
        "Methotrexate",
      ],
      dosage:
        "Adults: 1 tablet twice or thrice daily for 5-7 days. Take with food to reduce stomach upset.",
      storage: "Store in a cool, dry place below 25°C",
      price_sources: [
        {
          platform: "1mg",
          price: 132.0,
          url: "https://1mg.com",
          availability: "In Stock",
        },
        {
          platform: "PharmEasy",
          price: 137.0,
          url: "https://pharmeasy.in",
          availability: "Limited Stock",
        },
        {
          platform: "Netmeds",
          price: 135.5,
          url: "https://netmeds.com",
          availability: "In Stock",
        },
      ],
    },
  ],
};

// // Helper functions
// function createCompositionHash(composition: Composition[]): string {
//   return composition
//     .map(
//       (c) =>
//         `${c.ingredient.toLowerCase()}_${c.strength}${c.unit.toLowerCase()}`
//     )
//     .sort()
//     .join("+");
// }

function findAlternativesByComposition(
  medicine: Medicine,
  database: Medicine[]
): Alternatives {
  const targetHash = medicine.composition_hash;

  const exactMatches = database.filter(
    (m) => m.id !== medicine.id && m.composition_hash === targetHash
  );

  const targetIngredients = medicine.composition
    .map((c) => c.ingredient.toLowerCase())
    .sort();
  const sameIngredients = database.filter((m) => {
    if (m.id === medicine.id) return false;
    const candidateIngredients = m.composition
      .map((c) => c.ingredient.toLowerCase())
      .sort();
    return (
      JSON.stringify(targetIngredients) === JSON.stringify(candidateIngredients)
    );
  });

  const primaryIngredient = medicine.composition[0].ingredient.toLowerCase();
  const similarEffect = database.filter(
    (m) =>
      m.id !== medicine.id &&
      m.composition.some(
        (c) => c.ingredient.toLowerCase() === primaryIngredient
      ) &&
      !exactMatches.includes(m) &&
      !sameIngredients.includes(m)
  );

  return {
    exact: exactMatches.sort((a, b) => a.price - b.price),
    sameIngredients: sameIngredients.filter((m) => !exactMatches.includes(m)),
    similar: similarEffect,
  };
}

const MedicineAlternativesFinder: FC = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const [alternatives, setAlternatives] = useState<Alternatives | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    | "what_it_does"
    | "uses"
    | "side_effects"
    | "contraindications"
    | "interactions"
    | "dosage"
  >("what_it_does");

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        // Simulate OCR extraction - in real app, call OCR API here
        setTimeout(() => {
          setSearchQuery("Crocin 650");
          handleSearch("Crocin 650");
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = (query: string = searchQuery): void => {
    const medicine = medicineDatabase.medicines.find((m) =>
      m.brand_name.toLowerCase().includes(query.toLowerCase())
    );

    if (medicine) {
      setSelectedMedicine(medicine);
      const alts = findAlternativesByComposition(
        medicine,
        medicineDatabase.medicines
      );
      setAlternatives(alts);
    }
  };

  const calculateSavings = (
    originalPrice: number,
    alternativePrice: number
  ): Savings => {
    const savings = originalPrice - alternativePrice;
    const percentage = ((savings / originalPrice) * 100).toFixed(0);
    return { amount: savings, percentage };
  };

  const formatComposition = (composition: Composition[]): string => {
    return composition
      .map((c) => `${c.ingredient} ${c.strength}${c.unit}`)
      .join(" + ");
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-x-hidden">
      {/* Header */}
      <Header></Header>

      <div className="w-full px-8 py-8">
        {/* Search Section */}
        <div className="w-full bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-5 gap-8">
            {/* Image Upload - 2 columns */}
            <div className="col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-indigo-600" />
                Upload Medicine Photo
              </h3>
              <div className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center hover:border-indigo-500 transition-all hover:shadow-md cursor-pointer h-64 flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer w-full h-full flex items-center justify-center"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain rounded-lg"
                    />
                  ) : (
                    <div>
                      <Upload className="w-16 h-16 mx-auto text-indigo-400 mb-3" />
                      <p className="text-gray-700 font-medium mb-1">
                        Drop image here or click to upload
                      </p>
                      <p className="text-sm text-gray-500">
                        OCR will extract medicine name automatically
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Search Input - 3 columns */}
            <div className="col-span-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-indigo-600" />
                Search Medicine
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Enter medicine name (e.g., Crocin 650, Combiflam, Augmentin 625)"
                    className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                  <button
                    onClick={() => handleSearch()}
                    className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg font-medium"
                  >
                    Search
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-3 font-medium">
                    Quick Search:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Crocin 650",
                      "Combiflam",
                      "Augmentin 625",
                      "Dolo 650",
                      "Saridon",
                    ].map((med) => (
                      <button
                        key={med}
                        onClick={() => {
                          setSearchQuery(med);
                          handleSearch(med);
                        }}
                        className="px-4 py-2 bg-white border-2 border-indigo-200 text-indigo-700 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all text-sm font-medium"
                      >
                        {med}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>How it works:</strong> Upload a photo or search by
                    name. We'll find medicines with the exact same composition
                    at lower prices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {selectedMedicine && (
          <>
            {/* Selected Medicine Card - Full Width with Side-by-Side Layout */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-2xl p-8 mb-8 text-white">
              <div className="grid grid-cols-3 gap-8">
                {/* Left: Main Info */}
                <div className="col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-4xl font-bold mb-2">
                        {selectedMedicine.brand_name}
                      </h2>
                      <p className="text-indigo-100 text-xl mb-4">
                        {selectedMedicine.generic_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-indigo-200 text-sm mb-1">Best Price</p>
                      <p className="text-5xl font-bold">
                        ₹
                        {Math.min(
                          ...selectedMedicine.price_sources.map((p) => p.price)
                        )}
                      </p>
                      <p className="text-indigo-200 text-xs mt-1">
                        MRP: ₹{selectedMedicine.price}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur rounded-xl p-5 mb-4">
                    <p className="text-sm font-medium text-indigo-100 mb-2">
                      COMPOSITION
                    </p>
                    <p className="text-xl font-semibold">
                      {formatComposition(selectedMedicine.composition)}
                    </p>
                  </div>

                  <div className="flex gap-3 mb-4 flex-wrap">
                    <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg font-medium">
                      {selectedMedicine.form}
                    </span>
                    <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg font-medium">
                      {selectedMedicine.pack_size} units
                    </span>
                    <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg font-medium">
                      {selectedMedicine.manufacturer}
                    </span>
                    {selectedMedicine.prescription_required ? (
                      <span className="bg-red-500/90 backdrop-blur px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
                        <AlertCircle className="w-4 h-4" /> Prescription
                        Required
                      </span>
                    ) : (
                      <span className="bg-green-500/90 backdrop-blur px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
                        <CheckCircle className="w-4 h-4" /> No Prescription
                        Needed
                      </span>
                    )}
                  </div>

                  {/* Price Comparison */}
                  <div className="bg-white/10 backdrop-blur rounded-xl p-5">
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Price Comparison
                    </h4>
                    <div className="space-y-2">
                      {selectedMedicine.price_sources.map((source) => (
                        <div
                          key={source.platform}
                          className="flex items-center justify-between bg-white/10 rounded-lg p-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">
                              {source.platform}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                source.availability === "In Stock"
                                  ? "bg-green-500/80"
                                  : source.availability === "Limited Stock"
                                    ? "bg-yellow-500/80"
                                    : "bg-red-500/80"
                              }`}
                            >
                              {source.availability}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold">
                              ₹{source.price}
                            </span>
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
                            >
                              Buy
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Detailed Info Tabs */}
                <div className="col-span-1">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-5 h-full">
                    <div className="flex flex-col gap-2 mb-4">
                      {[
                        {
                          key: "what_it_does",
                          label: "How It Works",
                          icon: Info,
                        },
                        { key: "uses", label: "Uses", icon: CheckCircle },
                        {
                          key: "side_effects",
                          label: "Side Effects",
                          icon: AlertCircle,
                        },
                        {
                          key: "contraindications",
                          label: "Contraindications",
                          icon: AlertCircle,
                        },
                        {
                          key: "interactions",
                          label: "Drug Interactions",
                          icon: AlertCircle,
                        },
                        { key: "dosage", label: "Dosage", icon: Pill },
                      ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`px-3 py-2 rounded-lg transition-colors text-left flex items-center gap-2 text-sm ${
                              activeTab === tab.key
                                ? "bg-white text-indigo-600 font-semibold"
                                : "bg-white/10 text-white hover:bg-white/20"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="bg-white/10 rounded-lg p-4 max-h-96 overflow-y-auto">
                      {activeTab === "what_it_does" && (
                        <p className="text-sm leading-relaxed">
                          {selectedMedicine.what_it_does}
                        </p>
                      )}
                      {activeTab === "uses" && (
                        <div className="space-y-2">
                          {selectedMedicine.uses.map((use) => (
                            <div key={use} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{use}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {activeTab === "side_effects" && (
                        <div className="space-y-2">
                          {selectedMedicine.side_effects.map((effect) => (
                            <div
                              key={effect}
                              className="flex items-start gap-2"
                            >
                              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-300" />
                              <span className="text-sm">{effect}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {activeTab === "contraindications" && (
                        <div className="space-y-2">
                          {selectedMedicine.contraindications.map((contra) => (
                            <div
                              key={contra}
                              className="flex items-start gap-2"
                            >
                              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-300" />
                              <span className="text-sm">{contra}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {activeTab === "interactions" && (
                        <div className="space-y-2">
                          {selectedMedicine.drug_interactions.map(
                            (interaction) => (
                              <div
                                key={interaction}
                                className="flex items-start gap-2"
                              >
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-300" />
                                <span className="text-sm">{interaction}</span>
                              </div>
                            )
                          )}
                        </div>
                      )}
                      {activeTab === "dosage" && (
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-indigo-200 mb-1">
                              RECOMMENDED DOSAGE
                            </p>
                            <p className="text-sm">{selectedMedicine.dosage}</p>
                          </div>
                          <div>
                            <p className="text-xs text-indigo-200 mb-1">
                              STORAGE
                            </p>
                            <p className="text-sm">
                              {selectedMedicine.storage}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternatives Section */}
            {alternatives &&
              (alternatives.exact.length > 0 ||
                alternatives.similar.length > 0) && (
                <div className="space-y-8">
                  {/* Exact Alternatives */}
                  {alternatives.exact.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 p-2 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800">
                              Exact Alternatives
                            </h3>
                            <p className="text-sm text-gray-600">
                              Same composition • {alternatives.exact.length}{" "}
                              options found
                            </p>
                          </div>
                        </div>
                        {alternatives.exact[0] && (
                          <div className="bg-green-50 border-2 border-green-200 rounded-xl px-6 py-3">
                            <p className="text-sm text-green-700 font-medium">
                              Best Savings
                            </p>
                            <p className="text-3xl font-bold text-green-600">
                              ₹
                              {
                                calculateSavings(
                                  selectedMedicine.price,
                                  alternatives.exact[0].price
                                ).amount
                              }
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        {alternatives.exact.map((alt) => {
                          const savings = calculateSavings(
                            selectedMedicine.price,
                            alt.price
                          );
                          return (
                            <div
                              key={alt.id}
                              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-green-200 overflow-hidden group"
                            >
                              <div className="p-6">
                                {savings.amount > 0 && (
                                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-flex items-center gap-1 mb-4">
                                    <TrendingDown className="w-4 h-4" />
                                    Save {savings.percentage}%
                                  </div>
                                )}
                                {savings.amount === 0 &&
                                  alt.price < selectedMedicine.price && (
                                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-flex items-center gap-1 mb-4">
                                      Same Price
                                    </div>
                                  )}

                                <h4 className="font-bold text-xl text-gray-800 mb-1">
                                  {alt.brand_name}
                                </h4>
                                <p className="text-sm text-gray-500 mb-4">
                                  {alt.manufacturer}
                                </p>

                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                  <p className="text-xs text-gray-600 mb-1 uppercase font-medium">
                                    Composition
                                  </p>
                                  <p className="text-sm font-medium text-gray-800">
                                    {formatComposition(alt.composition)}
                                  </p>
                                </div>

                                <div className="flex justify-between items-end">
                                  <div>
                                    <p className="text-3xl font-bold text-indigo-600">
                                      ₹{alt.price}
                                    </p>
                                    {savings.amount > 0 && (
                                      <p className="text-sm text-green-600 font-semibold">
                                        Save ₹{savings.amount}
                                      </p>
                                    )}
                                  </div>
                                  <div className="text-right text-xs text-gray-500">
                                    <p className="font-medium">
                                      {alt.pack_size} {alt.form}s
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-green-50 px-6 py-3 border-t-2 border-green-100">
                                <p className="text-xs text-green-700 font-medium">
                                  ✓ Exact same composition
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Similar Alternatives */}
                  {alternatives.similar.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Info className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800">
                            Similar Medicines
                          </h3>
                          <p className="text-sm text-gray-600">
                            Contains primary ingredient •{" "}
                            {alternatives.similar.length} options
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        {alternatives.similar.map((alt) => (
                          <div
                            key={alt.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-blue-200 overflow-hidden"
                          >
                            <div className="p-6">
                              <h4 className="font-bold text-xl text-gray-800 mb-1">
                                {alt.brand_name}
                              </h4>
                              <p className="text-sm text-gray-500 mb-4">
                                {alt.manufacturer}
                              </p>

                              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                <p className="text-xs text-blue-600 mb-1 uppercase font-medium">
                                  Composition
                                </p>
                                <p className="text-sm font-medium text-gray-800">
                                  {formatComposition(alt.composition)}
                                </p>
                              </div>

                              <div className="flex justify-between items-end">
                                <p className="text-3xl font-bold text-indigo-600">
                                  ₹{alt.price}
                                </p>
                                <div className="text-right text-xs text-gray-500">
                                  <p className="font-medium">
                                    {alt.pack_size} {alt.form}s
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="bg-blue-50 px-6 py-3 border-t-2 border-blue-100">
                              <p className="text-xs text-blue-700 font-medium">
                                ℹ Similar therapeutic effect
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            {/* Disclaimer */}
            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold text-base mb-2">
                    ⚠️ Important Medical Disclaimer
                  </p>
                  <p>
                    This information is for reference purposes only and should
                    not be considered medical advice. Always consult your doctor
                    or licensed pharmacist before switching medications.
                    Individual responses to medicines may vary. Never
                    self-medicate or change prescribed medications without
                    professional guidance.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Empty State */}
        {!selectedMedicine && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="bg-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Pill className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Ready to Find Alternatives?
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Upload a medicine photo or search by name to discover affordable
              alternatives
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Composition-based matching</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span>Save up to 60%</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span>Verified database</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineAlternativesFinder;
