import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import { Button } from "@/components/ui/button"

export function JsonEditor() {
  const [code, setCode] = React.useState(
    `
    {
        "income": 0.3,
        "name_email_similarity": 0.986506310633034,
        "prev_address_months_count": 9,
        "current_address_months_count": 25,
        "customer_age": 40,
        "days_since_request": 0.0067353870811739,
        "intended_balcon_amount": 102.45371092469456,
        "payment_type": "AA",
        "zip_count_4w": 1059,
        "velocity_6h": 9223.283430930423,
        "velocity_24h": 7850.955007125409,
        "velocity_4w": 6742.080561007602,
        "bank_branch_count_8w": 5,
        "date_of_birth_distinct_emails_4w": 5,
        "employment_status": "CB",
        "credit_risk_score": 163,
        "email_is_free": 1,
        "housing_status": "BC",
        "phone_home_valid": false,
        "phone_mobile_valid": true,
        "bank_months_count": 9,
        "has_other_cards": 0,
        "proposed_credit_limit": 1500.0,
        "foreign_request": 0,
        "source": "INTERNET",
        "session_length_in_minutes": 16.224843433978073,
        "device_os": "linux",
        "keep_alive_session": 1,
        "device_distinct_emails_8w": 1,
        "device_fraud_count": 0,
        "month": 0
    }
    `
  );

  const [result, setResult] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const populateFraudulent = () => {

    const fraudulentJson = `
    {
        "income": 0.8,
        "name_email_similarity": 0.7943507115562781,
        "prev_address_months_count": -1,
        "current_address_months_count": 376,
        "customer_age": 60,
        "days_since_request": 17.925950550863003,
        "intended_balcon_amount": 41.422109688896775,
        "payment_type": "AA",
        "zip_count_4w": 815,
        "velocity_6h": 9747.40739649634,
        "velocity_24h": 6902.0196278389,
        "velocity_4w": 6467.154126567012,
        "bank_branch_count_8w": 46,
        "date_of_birth_distinct_emails_4w": 3,
        "employment_status": "CC",
        "credit_risk_score": 196,
        "email_is_free": 1,
        "housing_status": "BA",
        "phone_home_valid": true,
        "phone_mobile_valid": false,
        "bank_months_count": 28,
        "has_other_cards": 0,
        "proposed_credit_limit": 1500.0,
        "foreign_request": 0,
        "source": "INTERNET",
        "session_length_in_minutes": 2.5501671446073715,
        "device_os": "linux",
        "keep_alive_session": 0,
        "device_distinct_emails_8w": 1,
        "device_fraud_count": 0,
        "month": 0
    }
    `
    setCode(fraudulentJson)
  };

  const handleSubmit = () => {
    setError(null)

    fetch(`/api/infer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: code,
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP Error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('API response', data);
        setResult(data.prediction[0])
        setError(null)
    })
    
    .catch((error) => {
        console.error('Error submitting JSON:', error);
        setError('An error occurred while submitting the JSON.');
        setResult(null); // Clear previous result
    });
  };

  const populateNotFraudulent = () => {
    const notFraudulentJson = 
    `
    {
        "income": 0.3,
        "name_email_similarity": 0.986506310633034,
        "prev_address_months_count": 9,
        "current_address_months_count": 25,
        "customer_age": 40,
        "days_since_request": 0.0067353870811739,
        "intended_balcon_amount": 102.45371092469456,
        "payment_type": "AA",
        "zip_count_4w": 1059,
        "velocity_6h": 9223.283430930423,
        "velocity_24h": 7850.955007125409,
        "velocity_4w": 6742.080561007602,
        "bank_branch_count_8w": 5,
        "date_of_birth_distinct_emails_4w": 5,
        "employment_status": "CB",
        "credit_risk_score": 163,
        "email_is_free": 1,
        "housing_status": "BC",
        "phone_home_valid": false,
        "phone_mobile_valid": true,
        "bank_months_count": 9,
        "has_other_cards": 0,
        "proposed_credit_limit": 1500.0,
        "foreign_request": 0,
        "source": "INTERNET",
        "session_length_in_minutes": 16.224843433978073,
        "device_os": "linux",
        "keep_alive_session": 1,
        "device_distinct_emails_8w": 1,
        "device_fraud_count": 0,
        "month": 0
    }
    `
    setCode(notFraudulentJson)
  };

  React.useEffect(() => {
    console.log('Result updated:', result); // Debugging: Log result when it changes
  }, [result]);

  return (
    <div>
        <div className="flex justify-between py-2">
            <div className="">
                <Button className="w-[180px] mr-2" onClick={populateFraudulent}>
                    Fraudulent Example
                </Button>
                <Button className="w-[180px] ml-2" onClick={populateNotFraudulent}>
                    Not Fraudulent Example
                </Button>
            </div>
            <Button className="w-[80px]" onClick={handleSubmit}>
                Submit
            </Button>
        </div>

        {error && (
        <div className="mt-4 text-red-500">
          <h2 className="text-lg font-bold">Error:</h2>
          <p className="text-xl">{error}</p>
        </div>
        )}

        {result !== null && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Prediction Result:</h2>
          <p className="text-xl">
            {result === 1 ? 'Fraudulent' : 'Not Fraudulent'}
          </p>
        </div>
        )}

        <div className="border">
            <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(code, languages.js, "language-json")}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                }}
            />
        </div>
        
    </div>
  );
}