import { useEffect, useState } from 'react';

export default function useCategory(category) {
  const [cat, setCat] = useState();

  useEffect(() => {
    if (category === 'DEVELOPMENT') setCat('개발');
    else if (category === 'HOBBY') setCat('취미');
    else if (category === 'SPORT') setCat('스포츠');
    else if (category === 'GAME') setCat('게임');
  }, [category]);

  return cat;
}
