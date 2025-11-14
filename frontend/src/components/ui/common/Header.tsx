import { CheckCircle, Pill, Shield } from "lucide-react";

const Header = () => {
  return (
    <>
      <div className="w-full bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Pill className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-indigo-900">MediFind</h1>
                <p className="text-sm text-gray-600">
                  Find Affordable Medicine Alternatives
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-600" />
                <span>Verified Database</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Composition Matched</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
