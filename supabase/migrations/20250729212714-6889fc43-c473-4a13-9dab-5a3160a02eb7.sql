-- Fix security warning: Set search_path for functions to prevent security issues

-- Update the update_updated_at_column function with secure search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Update the handle_new_user function with secure search_path  
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (user_id, username, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'username', NEW.raw_user_meta_data ->> 'display_name');
  
  -- Create credits account with initial 10 credits
  INSERT INTO public.credits (user_id, balance)
  VALUES (NEW.id, 10);
  
  -- Record initial credit transaction
  INSERT INTO public.credit_transactions (user_id, transaction_type, amount, description)
  VALUES (NEW.id, 'bonus', 10, 'Welcome bonus credits');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';