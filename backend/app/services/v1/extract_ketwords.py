from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
from mecab import MeCab
from app.utils.logging import logger


def extract_keywords(text: str, num_keywords: int = 20) -> str:
    try:
        if not text or not isinstance(text, str):
            logger.warning("키워드 추출 실패: 텍스트가 비어있거나 문자열이 아닙니다.")
            return ""

        mecab = MeCab()
        nouns = mecab.nouns(text)
        
        if not nouns:
            logger.warning("키워드 추출 실패: 추출된 명사가 없습니다.")
            return ""
            
        noun_text = ' '.join(nouns)
        
        vectorizer = TfidfVectorizer(stop_words='english', max_features=num_keywords)
        tfidf_matrix = vectorizer.fit_transform([noun_text])
        feature_names = vectorizer.get_feature_names_out()
        tfidf_scores = tfidf_matrix.toarray().flatten()
        
        top_indices = np.argsort(tfidf_scores)[::-1][:num_keywords]
        top_keywords = [feature_names[i] for i in top_indices]
        
        return ','.join(top_keywords)
        
    except Exception as e:
        logger.error(f"키워드 추출 중 예외 발생: {str(e)}")
        return ""