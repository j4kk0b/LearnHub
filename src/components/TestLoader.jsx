// src/components/Test.js
import { useState, useEffect } from 'react';
import Loader from './Loader';
import supabase from "../services/supabase";
import { useParams } from 'react-router';

function TestLoader() {
  const {testId} = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('questions')
        .select()
        .eq('id', testId);

        setQuestions(data);
      setIsLoading(false);
    };

    fetchQuestions();
  }, [testId]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  if (isLoading) {
    return <Loader />
  }

  if (questions.length === 0) {
    return <div>No questions available for this test.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>Test</h2>
      <div>
        <p>{currentQuestion.question_text}</p>
        {/* Here you can add input fields based on question type */}
      </div>
      {currentQuestionIndex < questions.length - 1 && (
        <button onClick={handleNextQuestion}>Next Question</button>
      )}
      {currentQuestionIndex === questions.length - 1 && (
        <button onClick={() => alert('Test Completed!')}>Submit Test</button>
      )}
    </div>
  );
}

export default TestLoader;
