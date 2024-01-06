//convert user profile to ui model

export const transformToFormDataModel = (data:any) => {
    return {
      Age: data.Personal_Details.Age.toString(),
      Height: data.Physical_Details.Height.replace(/[^\d.]/g, ''),
      Weight: data.Physical_Details.Weight.replace(/[^\d.]/g, ''),
      BP_Upper_Limit: data.Physical_Details.BP_Level.Upper_Limit.toString(),
      BP_Lower_Limit: data.Physical_Details.BP_Level.Lower_Limit.toString(),
      Sugar_Upper_Limit: data.Physical_Details.Sugar_Level.Upper_Limit.toString(),
      Sugar_Lower_Limit: data.Physical_Details.Sugar_Level.Lower_Limit.toString(),
      Skeletal_Mass: data.Physical_Details.Skeletal_Mass.replace(/[^\d.]/g, ''),
      Fat_Mass: data.Physical_Details.Fat_Mass.replace(/[^\d.]/g, ''),
      Water_Mass: data.Physical_Details.Water_Mass.replace(/[^\d.]/g, ''),
      Intended_Sugar_Limit: data.Physical_Details.Intended_Sugar_Limit.replace(/[^\d.]/g, ''),
      Intended_Fat_Limit: data.Physical_Details.Intended_Fat_Limit.replace(/[^\d.]/g, ''),
      Intended_Protein_Limit: data.Physical_Details.Intended_Protein_Limit.replace(/[^\d.]/g, '')
    };
  };
  