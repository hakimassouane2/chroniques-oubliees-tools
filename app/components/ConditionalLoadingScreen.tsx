// components/ConditionalLoadingScreen.tsx

import { useLoading } from "../contexts/LoadingContext";
import LoadingScreen from "./LoadingScreen";

const ConditionalLoadingScreen: React.FC = () => {
  const { isLoading } = useLoading();

  return isLoading ? <LoadingScreen /> : null;
};

export default ConditionalLoadingScreen;
